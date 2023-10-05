using FluentValidation;

using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;

namespace Sisa.Blog.Api.V1.Posts.Commands;

public sealed partial class ReactToPostCommand : ICommand<Empty>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;

    public ReactionType ParsedType => System.Enum.TryParse(Type, out ReactionType type) ? type : ReactionType.Unspecified;
}

public sealed class ReactToPostCommandValidator : AbstractValidator<ReactToPostCommand>
{
    public ReactToPostCommandValidator()
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

public class ReactToPostCommandHandler(
    IPostRepository repository,
    ILogger<ReactToPostCommandHandler> logger
) : ICommandHandler<ReactToPostCommand, Empty>
{
    public async ValueTask<Empty> HandleAsync(ReactToPostCommand command, CancellationToken cancellationToken = default)
    {
        Post? post = await repository
            .FindAsync(command.ParsedId, cancellationToken);

        if (post is null)
        {
            logger.LogWarning("Post with id {id} not found", command.Id);

            throw new Exception($"Post with id {command.Id} not found");
        }

        if (!post.IsReactAble())
        {
            logger.LogWarning("Can not react to post id {id}", command.Id);

            throw new Exception($"Can not react to post id {command.Id}");
        }

        post.React(Guid.Empty, command.ParsedType);

        repository.Update(post);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
