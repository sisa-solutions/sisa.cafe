using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Api.V1.Tags.Commands;

public sealed partial class DeleteTagCommand : ICommand<Empty>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
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

        repository.Remove(tag);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
