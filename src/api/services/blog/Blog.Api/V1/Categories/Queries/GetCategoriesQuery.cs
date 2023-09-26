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
    ICategoryRepository repository,
    ILogger<GetCategoriesQueryHandler> logger
) : IQueryHandler<GetCategoriesQuery, ListCategoriesResponse>
{
    public async ValueTask<ListCategoriesResponse> HandleAsync(GetCategoriesQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Getting categories");

        var queryBuilder = repository
            .Query
            .ProjectToResponse()
            .OrderBy(x => x.Name)
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(query.Filter.Name))
        {
            logger.LogInformation("Filtering by name: {Name}", query.Filter.Name);

            queryBuilder = queryBuilder.Where(x => EF.Functions.ILike(x.Name, $"%{query.Filter.Name}%"));
        }

        IPaginatedList<CategoryResponse> categories = await queryBuilder
            .ToPaginatedListAsync(query.Paging.Page, query.Paging.PageSize, cancellationToken);

        return categories.MapToResponse();
    }
}
