using FluentValidation;

using Grpc.Core;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Files.Responses;
using Sisa.Blog.Domain.AggregatesModel.FileAggregate;
using Sisa.Grpc;

using File = Sisa.Blog.Domain.AggregatesModel.FileAggregate.File;

namespace Sisa.Blog.Api.V1.Files.Commands;

// public sealed partial class FileContentParams : IFileContentParams
// {
// }

// public sealed partial class UploadSingleFileCommand : ICommand<SingleFileResponse>
// {
//     public string Name { get; set; } = string.Empty;
//     public string? Title { get; set; }
//     public string? Description { get; set; }
//     public Dictionary<string, string> Tags { get; set; } = [];

//     public Stream Content { get; set; } = Stream.Null;
// }

// public sealed partial class UploadFileCommand : IFileStream<FileContentParams>
// {

// }

public sealed class UploadSingleFileCommand : ICommand<SingleFileResponse>
{
    public IAsyncStreamReader<UploadFileCommand> RequestStream { get; set; } = null!;
}

public sealed class UploadSingleFileCommandValidator : AbstractValidator<UploadSingleFileCommand>
{
    public UploadSingleFileCommandValidator()
    {
    }
}

public class UploadSingleFileCommandHandler(
    // IFileRepository repository,
    IFileStorageService fileStorageService,
    ILogger<UploadSingleFileCommandHandler> logger
) : ICommandHandler<UploadSingleFileCommand, SingleFileResponse>
{
    public async ValueTask<SingleFileResponse> HandleAsync(UploadSingleFileCommand command, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Uploading File with name {name}", "aaa");

        using var stream = new MemoryStream();

        while (await command.RequestStream.MoveNext(cancellationToken))
        {
            var chunk = command.RequestStream.Current.Content.Chunk.ToByteArray();

            await stream.WriteAsync(chunk, cancellationToken);
        }

        await fileStorageService.UploadAsync("sisa-blog", "/aaa", "fileName", stream, "", new Dictionary<string, string>(), cancellationToken);

        return await Task.FromResult(new SingleFileResponse());


        // var category = new File(command.Name, command.Slug);

        // category.Describe(command.Description);

        // if (command.ParsedParentId.HasValue)
        // {
        //     var isParentExisting = await repository
        //         .ExistAsync(x => x.Id == command.ParsedParentId, cancellationToken);

        //     if (!isParentExisting)
        //     {
        //         logger.LogWarning("Parent category with id {id} not found", command.ParentId);

        //         throw new Exception($"Parent category with id {command.ParentId} not found");
        //     }

        //     category.SetParent(command.ParsedParentId.Value);
        // }

        // repository.Add(category);

        // await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        // return category.ToSingleResponse();
    }
}
