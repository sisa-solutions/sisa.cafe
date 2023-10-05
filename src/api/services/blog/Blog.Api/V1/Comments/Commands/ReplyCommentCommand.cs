using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Comments.Responses;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;

namespace Sisa.Blog.Api.V1.Comments.Commands;

public sealed partial class ReplyCommentCommand : ICommand<SingleCommentResponse>
{
    public Guid ParsedParentId => Guid.TryParse(ParentId, out Guid id) ? id : Guid.Empty;
}

public sealed class ReplyCommentCommandValidator : AbstractValidator<ReplyCommentCommand>
{
    public ReplyCommentCommandValidator()
    {
        RuleFor(x => x.ParentId)
            .NotEmpty()
            .Must((x, _) => x.ParsedParentId != Guid.Empty)
                .WithMessage("Invalid Parent Id");

        RuleFor(x => x.Content)
            .NotEmpty()
            .MaximumLength(500);
    }
}

public class ReplyCommentCommandHandler(
    ICommentRepository repository,
    ILogger<ReplyCommentCommandHandler> logger
) : ICommandHandler<ReplyCommentCommand, SingleCommentResponse>
{
    public async ValueTask<SingleCommentResponse> HandleAsync(ReplyCommentCommand command, CancellationToken cancellationToken = default)
    {
        Comment? comment = await repository
            .FindAsync(command.ParsedParentId, cancellationToken);

        if (comment is null)
        {
            logger.LogWarning("Comment with id {id} not found", command.ParentId);

            throw new Exception($"Comment with id {command.ParentId} not found");
        }

        if (!comment.Post.IsCommentAble())
        {
            logger.LogWarning("Can not add comment to post id {id}", command.ParentId);

            throw new Exception($"Can not add comment to post id {command.ParentId}");
        }

        comment.Reply(command.Content);

        repository.Add(comment);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new SingleCommentResponse();
    }
}
