using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

namespace Sisa.Blog.Api.V1.Categories.Queries;

public sealed partial class FindCategoryBySlugQuery : IQuery<SingleCategoryResponse>
{
}

public sealed class FindCategoryBySlugQueryValidator : AbstractValidator<FindCategoryBySlugQuery>
{
    public FindCategoryBySlugQueryValidator()
    {
        RuleFor(x => x.Slug)
            .NotEmpty()
            .MaximumLength(50);
    }
}

public class FindCategoryBySlugQueryHandler(
    ICategoryRepository repository,
    ILogger<FindCategoryBySlugQueryHandler> logger
) : IQueryHandler<FindCategoryBySlugQuery, SingleCategoryResponse>
{
    public async ValueTask<SingleCategoryResponse> HandleAsync(FindCategoryBySlugQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding category by slug {Slug}", query.Slug);

        var category = await repository.FindAsync(
            x => x.Slug == query.Slug
            , CategoryProjections.Projection
            , cancellationToken
        );

        if (category is null)
        {
            logger.LogError("Category with slug {Slug} not found", query.Slug);

            throw new Exception("Category not found");
        }

        return category.ToSingleResponse();
    }
}
