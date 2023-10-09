using Google.Protobuf.WellKnownTypes;
using Grpc.Core;

using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Files.Commands;
using Sisa.Blog.Api.V1.Files.Queries;
using Sisa.Blog.Api.V1.Files.Responses;
using Sisa.Grpc;

namespace Sisa.Blog.Api.V1.Files;

[GrpcService]
public sealed class FileService(IMediator mediator) : FileGrpcService.FileGrpcServiceBase
{
    public override async Task<SingleFileResponse> FindFileById(FindFileByIdQuery request, ServerCallContext context)
        => await mediator.SendAsync(request, context.CancellationToken);

    public override async Task<ListFilesResponse> GetFiles(GetFilesQuery request, ServerCallContext context)
        => await mediator.SendAsync(request, context.CancellationToken);

    public override async Task<SingleFileResponse> UploadFile(IAsyncStreamReader<UploadFileCommand> requestStream, ServerCallContext context)
    {
        // Dictionary<string, string> tags = [];
        // using var customStream = new DirectFileStream<UploadFileCommand, FileContentParams>(requestStream);

        // await requestStream.MoveNext();
        // var b = requestStream.ReadAllAsync();
        // var fileInfo = requestStream.Current.Info;

        var command = new UploadSingleFileCommand
        {
            // Name = fileInfo.Name,
            // Title = fileInfo.Title,
            // Description = fileInfo.Description,
            // Tags = tags,

            // Content = customStream,
            RequestStream = requestStream
        };

        return await mediator.SendAsync(command, context.CancellationToken);
    }

    // public override Task<SingleFileResponse> UpdateFileInfo(UpdateFileInfoCommand request, ServerCallContext context)
    //     => mediator.SendAsync(request, context.CancellationToken);

    public override async Task<Empty> DeleteFile(DeleteFileCommand request, ServerCallContext context)
        => await mediator.SendAsync(request, context.CancellationToken);
}
