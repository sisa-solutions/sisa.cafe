using FluentValidation;

using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.PostAggregate;

namespace Sisa.Blog.Api.V1.Posts.Commands;

public sealed partial class PublishPostCommand : ICommand<Empty>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
}

public sealed class PublishPostCommandValidator : AbstractValidator<PublishPostCommand>
{
    public PublishPostCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
                .WithMessage("Invalid Id");

        RuleFor(x => x.Remark)
            .NotEmpty()
            .MaximumLength(200);
    }
}

public class PublishPostCommandHandler(
    IPostRepository repository,
    ILogger<PublishPostCommandHandler> logger
) : ICommandHandler<PublishPostCommand, Empty>
{
    public async ValueTask<Empty> HandleAsync(PublishPostCommand command, CancellationToken cancellationToken = default)
    {
        Post? post = await repository
            .FindAsync(command.ParsedId, cancellationToken);

        if (post is null)
        {
            logger.LogWarning("Post with id {id} not found", command.Id);

            throw new Exception($"Post with id {command.Id} not found");
        }

        if (!post.TryPublish(command.Remark))
        {
            logger.LogWarning("Post with id {id} cannot be published", command.Id);

            throw new Exception($"Post with id {command.Id} cannot be published");
        }

        repository.Update(post);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
