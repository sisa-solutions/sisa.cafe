using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

namespace Sisa.Blog.Api.V1.Categories.Commands;

public sealed partial class UpdateCategoryCommand : ICommand<SingleCategoryResponse>
{
    public Guid CategoryId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
    public Guid? ParentCategoryId => Guid.TryParse(ParentId, out Guid parentId) ? parentId : null;
}

public sealed class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
{
    public UpdateCategoryCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((a, b) => a.ParentCategoryId != Guid.Empty);

        RuleFor(x => x.ParentId)
            .NotEmpty()
            .Must((a, b) => a.ParentCategoryId != null && a.ParentCategoryId != Guid.Empty);

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

public class UpdateCategoryCommandHandler(
    ICategoryRepository repository,
    ILogger<UpdateCategoryCommandHandler> logger
) : ICommandHandler<UpdateCategoryCommand, SingleCategoryResponse>
{
    public async ValueTask<SingleCategoryResponse> HandleAsync(UpdateCategoryCommand command, CancellationToken cancellationToken = default)
    {
        Category? category = await repository
            .FindAsync(command.CategoryId, cancellationToken);

        if (category is null)
        {
            logger.LogWarning("Category with id {id} not found", command.CategoryId);

            throw new Exception($"Category with id {command.CategoryId} not found");
        }

        bool categoryExists = await repository
            .ExistAsync(category.Id, command.Slug, cancellationToken);

        if (categoryExists)
        {
            logger.LogWarning("Category with name {slug} already exists", command.Slug);

            throw new Exception($"Category with name {command.Slug} already exists");
        }

        category.Update(
            command.Name,
            command.Slug
        );

        category.Describe(command.Description);

        if (command.ParentCategoryId.HasValue && command.ParentCategoryId != category.ParentId)
        {
            var alreadyExisting = await repository
                .ExistAsync(command.ParentCategoryId.Value, cancellationToken);

            if (!alreadyExisting)
            {
                logger.LogWarning("Parent category with id {id} not found", command.ParentCategoryId.Value);

                throw new Exception($"Parent category with id {command.ParentCategoryId.Value} not found");
            }

            category.SetParent(command.ParentCategoryId.Value);
        }

        repository.Update(category);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return category.ToSingleResponse();
    }
}

