using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.PostAggregate;

using Sisa.Blog.Api.V1.Comments.Responses;

namespace Sisa.Blog.Api.V1.Posts.Commands;

public sealed partial class CreateCommentCommand : ICommand<SingleCommentResponse>
{
    public Guid ParsedPostId => Guid.TryParse(PostId, out Guid id) ? id : Guid.Empty;
}

public sealed class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
{
    public CreateCommentCommandValidator()
    {
        RuleFor(x => x.PostId)
            .NotEmpty()
            .Must((x, _) => x.ParsedPostId != Guid.Empty)
                .WithMessage("Invalid Post Id");

        RuleFor(x => x.Content)
            .NotEmpty()
            .MaximumLength(500);
    }
}

public class CreateCommentCommandHandler(
    IPostRepository repository,
    ILogger<CreateCommentCommandHandler> logger
) : ICommandHandler<CreateCommentCommand, SingleCommentResponse>
{
    public async ValueTask<SingleCommentResponse> HandleAsync(CreateCommentCommand command, CancellationToken cancellationToken = default)
    {
        Post? post = await repository
            .FindAsync(command.ParsedPostId, cancellationToken);

        if (post is null)
        {
            logger.LogWarning("Post with id {id} not found", command.PostId);

            throw new Exception($"Post with id {command.PostId} not found");
        }

        if (!post.IsCommentAble())
        {
            logger.LogWarning("Can not add comment to post id {id}", command.PostId);

            throw new Exception($"Can not add comment to post id {command.PostId}");
        }

        post.AddComment(command.Content);

        repository.Update(post);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new SingleCommentResponse();
    }
}
