using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Blog.Domain.Specifications;

namespace Sisa.Blog.Api.V1.Categories.Queries;

public sealed partial class FindCategoryBySlugQuery : IQuery<SingleCategoryResponse>
{
}

public class FindCategoryBySlugQueryHandler(
    ICategoryRepository repository,
    ILogger<FindCategoryBySlugQueryHandler> logger
) : IQueryHandler<FindCategoryBySlugQuery, SingleCategoryResponse>
{
    public async ValueTask<SingleCategoryResponse> HandleAsync(FindCategoryBySlugQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding category by slug {Slug}", query.Slug);

        var specification = new CategorySpecification<CategoryResponse>(
            query.Slug,
            CategoryProjections.Projection
        );

        var category = await repository.FindAsync(specification, cancellationToken);

        if (category is null)
        {
            logger.LogError("Category with slug {Slug} not found", query.Slug);

            throw new Exception("Category not found");
        }

        return category.ToSingleResponse();
    }
}
