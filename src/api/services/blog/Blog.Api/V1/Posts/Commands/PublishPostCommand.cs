using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.PostAggregate;

namespace Sisa.Blog.Api.V1.Posts.Commands;

public sealed partial class PublishPostCommand : ICommand<Empty>
{
}

public class PublishPostCommandHandler(
    IPostRepository repository,
    ILogger<PublishPostCommandHandler> logger
) : ICommandHandler<PublishPostCommand, Empty>
{
    public async ValueTask<Empty> HandleAsync(PublishPostCommand command, CancellationToken cancellationToken = default)
    {
        Post? post = await repository
            .FindAsync(Guid.Parse(command.Id), cancellationToken);

        if (post is null)
        {
            logger.LogWarning("Post with id {id} not found", command.Id);

            throw new Exception($"Post with id {command.Id} not found");
        }

        if(!post.TryPublish(command.Remark))
        {
            logger.LogWarning("Post with id {id} cannot be published", command.Id);

            throw new Exception($"Post with id {command.Id} cannot be published");
        }

        repository.Update(post);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
