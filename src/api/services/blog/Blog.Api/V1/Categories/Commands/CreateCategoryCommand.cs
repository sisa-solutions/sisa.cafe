using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

namespace Sisa.Blog.Api.V1.Categories.Commands;

public sealed partial class CreateCategoryCommand : ICommand<SingleCategoryResponse>
{
    public Guid? ParsedParentId => Guid.TryParse(ParentId, out var id) ? id : null;
}

public sealed class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryCommandValidator()
    {
        RuleFor(x => x.ParentId)
            .NotEmpty()
            .Must((request, _) => request.ParsedParentId.HasValue && request.ParsedParentId.Value != Guid.Empty)
                .When((x, _) => x.ParsedParentId.HasValue)
                .WithMessage("Invalid Parent Id");

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

public class CreateCategoryCommandHandler(
    ICategoryRepository repository,
    ILogger<CreateCategoryCommandHandler> logger
) : ICommandHandler<CreateCategoryCommand, SingleCategoryResponse>
{
    public async ValueTask<SingleCategoryResponse> HandleAsync(CreateCategoryCommand command, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Creating category with name {slug}", command.Slug);

        bool categoryExists = await repository
            .ExistAsync(x => x.Slug == command.Slug, cancellationToken);

        if (categoryExists)
        {
            logger.LogWarning("Category with name {slug} already exists", command.Slug);

            throw new DomainException(
                StatusCode.CONFLICT,
                "400",
                $"Category with name {command.Slug} already exists"
            );
        }

        var category = new Category(command.Name, command.Slug);

        category.Describe(command.Description);

        if (command.ParsedParentId.HasValue)
        {
            var isParentExisting = await repository
                .ExistAsync(x => x.Id == command.ParsedParentId, cancellationToken);

            if (!isParentExisting)
            {
                logger.LogWarning("Parent category with id {id} not found", command.ParentId);

                throw new Exception($"Parent category with id {command.ParentId} not found");
            }

            category.SetParent(command.ParsedParentId.Value);
        }

        repository.Add(category);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return category.ToSingleResponse();
    }
}
