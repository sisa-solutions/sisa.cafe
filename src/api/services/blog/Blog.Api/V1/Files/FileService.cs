using Google.Protobuf.WellKnownTypes;
using Grpc.Core;

using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Files.Commands;
using Sisa.Blog.Api.V1.Files.Queries;
using Sisa.Blog.Api.V1.Files.Responses;

namespace Sisa.Blog.Api.V1.Files;

[GrpcService]
public sealed class FileService(IMediator mediator, IFileStorageService fileStorageService) : FileGrpcService.FileGrpcServiceBase
{
    public override async Task<SingleFileResponse> FindFileById(FindFileByIdQuery request, ServerCallContext context)
        => await mediator.SendAsync(request, context.CancellationToken);

    public override async Task<ListFilesResponse> GetFiles(GetFilesQuery request, ServerCallContext context)
        => await mediator.SendAsync(request, context.CancellationToken);

    public override async Task<SingleFileResponse> UploadFile(IAsyncStreamReader<UploadFileCommand> requestStream, ServerCallContext context)
    {
        string bucket = "sisa-cafe-local";
        string path = "path";
        string uploadId = "";
        int partNumber = 1;
        string originalName = "";
        string fileName = "";
        string key = "";
        string contentType = "";

        Dictionary<string, string> tags = [];
        Dictionary<int, string> eTags = [];
        long minPartSize = 5_242_880L; // 5 MB

        using var streamPart = new MemoryStream();

        while (await requestStream.MoveNext())
        {
            var commandStream = requestStream.Current;

            if (commandStream.FileCase == UploadFileCommand.FileOneofCase.Info)
            {
                originalName = commandStream.Info.Name;
                contentType = commandStream.Info.Type;
                tags = commandStream.Info.Tags.ToDictionary();

                var response = await fileStorageService.InitMultiPartUploadAsync(bucket, path, contentType, new Dictionary<string, string>(), context.CancellationToken);

                uploadId = response.UploadId;
                fileName = response.Name;
                key = response.Key;
            }
            else if (commandStream.FileCase == UploadFileCommand.FileOneofCase.Content)
            {
                commandStream.Content.WriteTo(streamPart);

                if (streamPart.Length >= minPartSize)
                {
                    var partETag = await UpaloadPartAsync(bucket, key, streamPart, uploadId, partNumber, context.CancellationToken);
                    eTags.Add(partNumber, partETag);

                    partNumber += 1;
                    streamPart.SetLength(0);
                }
            }
        }

        if (streamPart.Length > 0)
        {
            var eTag = await UpaloadPartAsync(bucket, key, streamPart, uploadId, partNumber, context.CancellationToken);
            eTags.Add(partNumber, eTag);
        }

        await fileStorageService.CompleteMultiPartUploadAsync(bucket, key, uploadId, eTags, context.CancellationToken);

        CreateFileInfoCommand command = new()
        {
            Bucket = bucket,
            Path = path,
            Name = fileName,
            Extension = "ext",
            MimeType = contentType,
            Size = 0,
            Tags = tags,
            OriginalName = originalName
        };

        return await mediator.SendAsync(command, context.CancellationToken);
    }

    private async ValueTask<string> UpaloadPartAsync(string bucket, string key, Stream stream, string uploadId, int partNumber, CancellationToken cancellationToken)
    {
        stream.Seek(0, SeekOrigin.Begin);
        var response = await fileStorageService.UploadPartAsync(bucket, key, stream, uploadId, partNumber, cancellationToken);

        return response.ETag;
    }

    // public override Task<SingleFileResponse> UpdateFileInfo(UpdateFileInfoCommand request, ServerCallContext context)
    //     => mediator.SendAsync(request, context.CancellationToken);

    public override async Task<Empty> DeleteFile(DeleteFileCommand request, ServerCallContext context)
        => await mediator.SendAsync(request, context.CancellationToken);
}
