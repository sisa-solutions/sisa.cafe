using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

namespace Sisa.Blog.Api.V1.Categories.Commands;

public sealed partial class CreateCategoryCommand : ICommand<SingleCategoryResponse>
{
}

public sealed class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryCommandValidator()
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

public class CreateCategoryCommandHandler(
    ICategoryRepository categoryRepository,
    ILogger<CreateCategoryCommandHandler> logger
) : ICommandHandler<CreateCategoryCommand, SingleCategoryResponse>
{
    public async ValueTask<SingleCategoryResponse> HandleAsync(CreateCategoryCommand command, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Creating category with name {slug}", command.Slug);

        bool categoryExists = await categoryRepository
            .ExistAsync(command.Slug, cancellationToken);

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

        categoryRepository.Add(category);

        await categoryRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return category.MapToResponse();
    }
}
