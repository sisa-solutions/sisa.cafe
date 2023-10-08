using FluentValidation;

using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;

namespace Sisa.Blog.Api.V1.Comments.Commands;

public sealed partial class DeleteCommentCommand : ICommand<Empty>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
}

public sealed class DeleteCommentCommandValidator : AbstractValidator<DeleteCommentCommand>
{
    public DeleteCommentCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
                .WithMessage("Invalid Id");
    }
}

public class DeleteCommentCommandHandler(
    ICommentRepository repository,
    ILogger<DeleteCommentCommandHandler> logger
) : ICommandHandler<DeleteCommentCommand, Empty>
{
    public async ValueTask<Empty> HandleAsync(DeleteCommentCommand command, CancellationToken cancellationToken = default)
    {
        Comment? comment = await repository
            .FindAsync(command.ParsedId, cancellationToken);

        if (comment is null)
        {
            logger.LogWarning("Comment with id {id} not found", command.Id);

            throw new Exception($"Comment with id {command.Id} not found");
        }

        repository.Remove(comment);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
