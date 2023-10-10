using FluentValidation;

using Grpc.Core;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Files.Responses;
using Sisa.Blog.Domain.AggregatesModel.FileAggregate;
using Sisa.Grpc;

using File = Sisa.Blog.Domain.AggregatesModel.FileAggregate.File;

namespace Sisa.Blog.Api.V1.Files.Commands;

public sealed partial class CreateFileInfoCommand: ICommand<SingleFileResponse>
{
    public string Bucket { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string MimeType { get; set; } = string.Empty;
    public string Extension { get; set; } = string.Empty;
    public int Size { get; set; }
    public IDictionary<string, string> Tags { get; set; } = new Dictionary<string, string>();

    public string OriginalName { get; set; } = string.Empty;
}

public sealed class CreateFileInfoCommandValidator : AbstractValidator<CreateFileInfoCommand>
{
    public CreateFileInfoCommandValidator()
    {
    }
}

public class CreateFileInfoCommandHandler(
    IFileRepository repository,
    ILogger<CreateFileInfoCommandHandler> logger
) : ICommandHandler<CreateFileInfoCommand, SingleFileResponse>
{
    public async ValueTask<SingleFileResponse> HandleAsync(CreateFileInfoCommand command, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Uploading File with name {name}", command.OriginalName);

        File file = new(command.OriginalName, command.Bucket, command.Path, command.Name, command.Size, command.Extension, command.MimeType);

        foreach (var tag in command.Tags)
        {
            file.AddOrUpdateTag(tag.Key, tag.Value);
        }

        repository.Add(file);

        await repository.UnitOfWork.SaveChangesAsync(cancellationToken);

        return file.ToSingleResponse();
    }
}
