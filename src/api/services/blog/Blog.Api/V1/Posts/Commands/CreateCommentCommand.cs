using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.PostAggregate;

using Sisa.Blog.Api.V1.Comments.Responses;

namespace Sisa.Blog.Api.V1.Posts.Commands;

public sealed partial class CreateCommentCommand : ICommand<SingleCommentResponse>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
}

public sealed class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
{
    public CreateCommentCommandValidator()
    {
        RuleFor(x => x.ParsedId)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
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
            .FindAsync(command.ParsedId, cancellationToken);

        if (post is null)
        {
            logger.LogWarning("Post with id {id} not found", command.Id);

            throw new Exception($"Post with id {command.Id} not found");
        }

        if (!post.IsCommentAble())
        {
            logger.LogWarning("Can not add comment to post id {id}", command.Id);

            throw new Exception($"Can not add comment to post id {command.Id}");
        }

        post.AddComment(command.Content);

        repository.Update(post);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new SingleCommentResponse();
    }
}
