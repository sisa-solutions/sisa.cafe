using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Comments.Responses;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;

namespace Sisa.Blog.Api.V1.Comments.Commands;

public sealed partial class UpdateCommentCommand : ICommand<SingleCommentResponse>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
}

public sealed class UpdateCommentCommandValidator : AbstractValidator<UpdateCommentCommand>
{
    public UpdateCommentCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
                .WithMessage("Invalid Id");

        RuleFor(x => x.Content)
            .NotEmpty()
            .MaximumLength(500);
    }
}

public class UpdateCommentCommandHandler(
    ICommentRepository repository,
    ILogger<UpdateCommentCommandHandler> logger
) : ICommandHandler<UpdateCommentCommand, SingleCommentResponse>
{
    public async ValueTask<SingleCommentResponse> HandleAsync(UpdateCommentCommand command, CancellationToken cancellationToken = default)
    {
        Comment? comment = await repository
            .FindAsync(command.ParsedId, cancellationToken);

        if (comment is null)
        {
            logger.LogWarning("Comment with id {id} not found", command.Id);

            throw new Exception($"Comment with id {command.Id} not found");
        }

        comment.Update(command.Content);

        repository.Update(comment);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new SingleCommentResponse();
    }
}
