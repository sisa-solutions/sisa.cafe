using FluentValidation;

using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.FileAggregate;

namespace Sisa.Blog.Api.V1.Files.Commands;

public sealed partial class DeleteFileCommand : ICommand<Empty>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
}

public sealed class DeleteFileCommandValidator : AbstractValidator<DeleteFileCommand>
{
    public DeleteFileCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
                .WithMessage("Invalid Id");
    }
}

public class DeleteFileCommandHandler(
    IFileRepository repository,
    ILogger<DeleteFileCommandHandler> logger
) : ICommandHandler<DeleteFileCommand, Empty>
{
    public async ValueTask<Empty> HandleAsync(DeleteFileCommand command, CancellationToken cancellationToken = default)
    {
        var file = await repository
            .FindAsync(command.ParsedId, cancellationToken);

        if (file is null)
        {
            logger.LogWarning("File with id {id} not found", command.Id);

            throw new Exception($"File with id {command.Id} not found");
        }

        repository.Remove(file);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
