using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Microsoft.EntityFrameworkCore;

namespace Sisa.Blog.Api.V1.Categories.Queries;

public sealed partial class GetCategoriesQuery : IQuery<ListCategoriesResponse>
{
}

public class GetCategoriesQueryHandler(
    ICategoryRepository categoryRepository,
    ILogger<GetCategoriesQueryHandler> logger
) : IQueryHandler<GetCategoriesQuery, ListCategoriesResponse>
{
    public async ValueTask<ListCategoriesResponse> HandleAsync(GetCategoriesQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Getting categories");

        var queryBuilder = categoryRepository
            .Query
            .ProjectToResponse()
            .OrderBy(x => x.Name)
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(query.Filter.Keyword))
        {
            logger.LogInformation("Filtering by name: {Name}", query.Filter.Keyword);

            queryBuilder = queryBuilder.Where(x => EF.Functions.Like(x.Name, $"%{query.Filter.Keyword}%"));
        }

        IPaginatedList<CategoryResponse> categories = await queryBuilder
            .ToPaginatedListAsync(query.Paging.Page, query.Paging.PageSize, cancellationToken);

        return categories.MapToResponse();
    }
}
