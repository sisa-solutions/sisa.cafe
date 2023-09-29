using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Blog.Domain.Specifications;

namespace Sisa.Blog.Api.V1.Categories.Queries;

public sealed partial class GetCategoriesQuery : IQuery<ListCategoriesResponse>
{
}

public class GetCategoriesQueryHandler(
    ICategoryRepository repository,
    ILogger<GetCategoriesQueryHandler> logger
) : IQueryHandler<GetCategoriesQuery, ListCategoriesResponse>
{
    public async ValueTask<ListCategoriesResponse> HandleAsync(GetCategoriesQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Getting categories");

        var specification = new CategorySpecification<CategoryResponse>(
            query.Filter.Name,
            query.Paging,
            CategoryProjections.Projection);

        var categories = await repository
            .PaginateAsync(specification, cancellationToken);

        return categories.ToListResponse();
    }
}
