using FluentValidation;

using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;
using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;
using Sisa.Blog.Domain.Specifications;

namespace Sisa.Blog.Api.V1.Comments.Commands;

public sealed partial class ReactToCommentCommand : ICommand<Empty>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;

    public ReactionType ParsedType => System.Enum.TryParse(Type, out ReactionType type) ? type : ReactionType.Unspecified;
}

public sealed class ReactToCommentCommandValidator : AbstractValidator<ReactToCommentCommand>
{
    public ReactToCommentCommandValidator()
    {
        RuleFor(x => x.ParsedId)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
                .WithMessage("Invalid Post Id");

        RuleFor(x => x.Type)
            .IsEnumName(typeof(ReactionType))
            .Must((x, _) => x.ParsedType != ReactionType.Unspecified)
                .WithMessage("Invalid Reaction Type");
    }
}

public class ReactToCommentCommandHandler(
    ICommentRepository repository,
    ILogger<ReactToCommentCommandHandler> logger
) : ICommandHandler<ReactToCommentCommand, Empty>
{
    public async ValueTask<Empty> HandleAsync(ReactToCommentCommand command, CancellationToken cancellationToken = default)
    {
        var spec = new CommentSpecification(command.ParsedId);

        Comment? comment = await repository
            .FindAsync(spec, cancellationToken);

        if (comment is null)
        {
            logger.LogWarning("Comment with id {id} not found", command.Id);

            throw new Exception($"Comment with id {command.Id} not found");
        }

        if(!comment.Post.IsReactAble())
        {
            logger.LogWarning("Can not react to comment id {id}", command.Id);

            throw new Exception($"Can not react to comment id {command.Id}");
        }

        comment.React(Guid.Empty, command.ParsedType);

        repository.Add(comment);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
