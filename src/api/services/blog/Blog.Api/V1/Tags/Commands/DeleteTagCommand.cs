using FluentValidation;

using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Api.V1.Tags.Commands;

public sealed partial class DeleteTagCommand : ICommand<Empty>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
}

public sealed class DeleteTagCommandValidator : AbstractValidator<DeleteTagCommand>
{
    public DeleteTagCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
                .WithMessage("Invalid Id");
    }
}

public class DeleteTagCommandHandler(
    ITagRepository repository,
    ILogger<DeleteTagCommandHandler> logger
) : ICommandHandler<DeleteTagCommand, Empty>
{
    public async ValueTask<Empty> HandleAsync(DeleteTagCommand command, CancellationToken cancellationToken = default)
    {
        Tag? tag = await repository
            .FindAsync(command.ParsedId, cancellationToken);

        if (tag is null)
        {
            logger.LogWarning("Tag with id {id} not found", command.Id);

            throw new Exception($"Tag with id {command.Id} not found");
        }

        if (tag.IsInUse())
        {
            logger.LogWarning("Tag with id {id} is in use", command.Id);

            throw new Exception($"Tag with id {command.Id} is in use");
        }

        repository.Remove(tag);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
