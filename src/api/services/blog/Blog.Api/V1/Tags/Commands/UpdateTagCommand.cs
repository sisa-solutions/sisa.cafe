using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Api.V1.Tags.Commands;

public sealed partial class UpdateTagCommand : ICommand<SingleTagResponse>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
}

public sealed class UpdateTagCommandValidator : AbstractValidator<UpdateTagCommand>
{
    public UpdateTagCommandValidator()
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

public class UpdateTagCommandHandler(
    ITagRepository repository,
    ILogger<UpdateTagCommandHandler> logger
) : ICommandHandler<UpdateTagCommand, SingleTagResponse>
{
    public async ValueTask<SingleTagResponse> HandleAsync(UpdateTagCommand command, CancellationToken cancellationToken = default)
    {
        Tag? tag = await repository
            .FindAsync(command.ParsedId, cancellationToken);

        if (tag is null)
        {
            logger.LogWarning("Tag with id {id} not found", command.Id);

            throw new Exception($"Tag with id {command.Id} not found");
        }

        bool tagExists = await repository
            .ExistAsync(x => x.Id != command.ParsedId && x.Slug == command.Slug, cancellationToken);

        if (tagExists)
        {
            logger.LogWarning("Tag with name {slug} already exists", command.Slug);

            throw new Exception($"Tag with name {command.Slug} already exists");
        }

        tag.Update(
            command.Name,
            command.Slug
        );

        tag.Describe(command.Description);

        repository.Update(tag);
        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);


        return tag.MapToResponse();
    }
}

