using FluentValidation;

using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.PostAggregate;

namespace Sisa.Blog.Api.V1.Posts.Commands;

public sealed partial class DeletePostCommand : ICommand<Empty>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
}

public sealed class DeletePostCommandValidator : AbstractValidator<DeletePostCommand>
{
    public DeletePostCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((request, _) => request.ParsedId != Guid.Empty);
    }
}

public class DeletePostCommandHandler(
    IPostRepository repository,
    ILogger<DeletePostCommandHandler> logger
) : ICommandHandler<DeletePostCommand, Empty>
{
    public async ValueTask<Empty> HandleAsync(DeletePostCommand command, CancellationToken cancellationToken = default)
    {
        Post? post = await repository
            .FindAsync(command.ParsedId, cancellationToken);

        if (post is null)
        {
            logger.LogWarning("Post with id {id} not found", command.Id);

            throw new Exception($"Post with id {command.Id} not found");
        }

        repository.Remove(post);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
