using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

namespace Sisa.Blog.Api.V1.Categories.Commands;

public sealed partial class UpdateCategoryCommand : ICommand<SingleCategoryResponse>
{
}

public sealed class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
{
    public UpdateCategoryCommandValidator()
    {
        RuleFor(x => x.ParentId)
            .Must(x => Guid.TryParse(x, out Guid parentId) && parentId != Guid.Empty)
            .When(x => !string.IsNullOrEmpty(x.ParentId));

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
    ICategoryRepository categoryRepository,
    ILogger<UpdateCategoryCommandHandler> logger
) : ICommandHandler<UpdateCategoryCommand, SingleCategoryResponse>
{
    public async ValueTask<SingleCategoryResponse> HandleAsync(UpdateCategoryCommand command, CancellationToken cancellationToken = default)
    {
        Category? category = await categoryRepository
            .FindAsync(Guid.Parse(command.Id), cancellationToken);

        if (category is null)
        {
            logger.LogWarning("Category with id {id} not found", command.Id);

            throw new Exception($"Category with id {command.Id} not found");
        }

        bool categoryExists = await categoryRepository
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

        categoryRepository.Update(category);

        await categoryRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return category.MapToResponse();
    }
}

