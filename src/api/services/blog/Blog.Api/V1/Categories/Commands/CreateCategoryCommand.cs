using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

namespace Sisa.Blog.Api.V1.Categories.Commands;

public sealed partial class CreateCategoryCommand : ICommand<SingleCategoryResponse>
{
    public Guid? ParentCategoryId => Guid.TryParse(ParentId, out var id) ? id : null;
}

public sealed class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryCommandValidator()
    {
        RuleFor(x => x.ParentId)
            .NotEmpty()
            .Must((request, _) => request.ParentCategoryId.HasValue
                && request.ParentCategoryId.Value != Guid.Empty
            );

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

        if (!string.IsNullOrEmpty(command.ParentId)
            && Guid.TryParse(command.ParentId, out Guid parentId))
        {
            var alreadyExisting = await repository
                .ExistAsync(parentId, cancellationToken);

            if (!alreadyExisting)
            {
                logger.LogWarning("Parent category with id {id} not found", parentId);

                throw new Exception($"Parent category with id {parentId} not found");
            }

            category.SetParent(parentId);
        }

        repository.Add(category);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return category.ToSingleResponse();
    }
}
