using Google.Protobuf.WellKnownTypes;
using Grpc.Core;

using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Files.Commands;
using Sisa.Blog.Api.V1.Files.Queries;
using Sisa.Blog.Api.V1.Files.Responses;
using Microsoft.Extensions.Options;
using Sisa.Infrastructure.Settings;

namespace Sisa.Blog.Api.V1.Files;

[GrpcService]
public sealed class FileService(IMediator mediator, IFileStorageService fileStorageService, IOptions<AwsSettings> awsSettings) : FileGrpcService.FileGrpcServiceBase
{
    public override async Task<SingleFileResponse> FindFileById(FindFileByIdQuery request, ServerCallContext context)
        => await mediator.SendAsync(request, context.CancellationToken);

    public override async Task<ListFilesResponse> GetFiles(GetFilesQuery request, ServerCallContext context)
        => await mediator.SendAsync(request, context.CancellationToken);

    public override async Task<SingleFileResponse> UploadFile(IAsyncStreamReader<UploadFileCommand> requestStream, ServerCallContext context)
    {
        CreateFileInfoCommand command = new()
        {
            Bucket = "sisa-cafe-local",
            Path = ""
        };

        string uploadId = "";
        string key = "";
        int partNumber = 1;
        bool preferMultiPartUpload = false;
        Dictionary<int, string> eTags = [];

        using var streamPart = new MemoryStream();

        while (await requestStream.MoveNext())
        {
            var commandStream = requestStream.Current;

            if (commandStream.FileCase == UploadFileCommand.FileOneofCase.Metadata)
            {
                command.Path = commandStream.Metadata.Path;
                command.ContentType = commandStream.Metadata.ContentType;
                command.Extension = Path.GetExtension(commandStream.Metadata.Name);

                command.Size = commandStream.Metadata.Size;
                command.Tags = commandStream.Metadata.Tags.ToDictionary();

                command.OriginalName = commandStream.Metadata.Name;

                preferMultiPartUpload = command.Size > awsSettings.Value.ChunkSize;

                if (preferMultiPartUpload)
                {
                    var response = await fileStorageService.InitMultiPartUploadAsync(
                        command.Bucket, command.Path, command.OriginalName, command.ContentType, command.Tags, context.CancellationToken);

                    if (response == null)
                    {
                        throw new Exception("Error initializing multipart upload");
                    }

                    command.Name = response.Name;

                    uploadId = response.UploadId;
                    key = response.Key;
                }
            }
            else if (commandStream.FileCase == UploadFileCommand.FileOneofCase.Content)
            {
                commandStream.Content.WriteTo(streamPart);

                if (preferMultiPartUpload)
                {
                    if (streamPart.Length >= awsSettings.Value.ChunkSize)
                    {
                        var partETag = await UploadPartAsync(command.Bucket, key, streamPart, uploadId, partNumber, context.CancellationToken);

                        eTags.Add(partNumber, partETag);

                        partNumber += 1;
                        streamPart.SetLength(0);
                    }
                }
            }
        }

        if (preferMultiPartUpload)
        {
            if (streamPart.Length > 0)
            {
                var eTag = await UploadPartAsync(command.Bucket, key, streamPart, uploadId, partNumber, context.CancellationToken);
                eTags.Add(partNumber, eTag);
            }

            await fileStorageService.CompleteMultiPartUploadAsync(command.Bucket, key, uploadId, eTags, context.CancellationToken);
        }
        else
        {
            var response = await fileStorageService.UploadAsync(command.Bucket, command.Path, command.OriginalName, streamPart, command.ContentType, command.Tags, context.CancellationToken);

            if (response == null)
            {
                throw new Exception("Error uploading file");
            }

            command.Name = response.Name;
        }

        return await mediator.SendAsync(command, context.CancellationToken);
    }

    private async ValueTask<string> UploadPartAsync(string bucket, string key, Stream stream, string uploadId, int partNumber, CancellationToken cancellationToken = default)
    {
        stream.Seek(0, SeekOrigin.Begin);
        var response = await fileStorageService.UploadPartAsync(bucket, key, stream, uploadId, partNumber, cancellationToken);

        if (response == null)
        {
            throw new Exception("Error uploading part");
        }

        return response.ETag;
    }

    // public override Task<SingleFileResponse> UpdateFileInfo(UpdateFileInfoCommand request, ServerCallContext context)
    //     => mediator.SendAsync(request, context.CancellationToken);

    public override async Task<Empty> DeleteFile(DeleteFileCommand request, ServerCallContext context)
        => await mediator.SendAsync(request, context.CancellationToken);
}
