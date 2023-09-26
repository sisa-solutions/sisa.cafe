using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Api.V1.Tags.Commands;

public sealed partial class CreateTagCommand : ICommand<SingleTagResponse>
{
}

public sealed class CreateTagCommandValidator : AbstractValidator<CreateTagCommand>
{
    public CreateTagCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(x => x.Slug)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(x => x.Description)
            .MaximumLength(200);
    }
}

public class CreateTagCommandHandler(
    ITagRepository repository,
    ILogger<CreateTagCommandHandler> logger
) : ICommandHandler<CreateTagCommand, SingleTagResponse>
{
    public async ValueTask<SingleTagResponse> HandleAsync(CreateTagCommand command, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Creating Tag with name {slug}", command.Slug);

        bool tagExists = await repository
            .ExistAsync(command.Slug, cancellationToken);

        if (tagExists)
        {
            logger.LogWarning("Tag with name {slug} already exists", command.Slug);

            throw new DomainException(
                StatusCode.CONFLICT,
                "400",
                $"Tag with name {command.Slug} already exists"
            );
        }

        var tag = new Tag(command.Name, command.Slug);

        tag.Describe(command.Description);

        repository.Add(tag);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return tag.MapToResponse();
    }
}
