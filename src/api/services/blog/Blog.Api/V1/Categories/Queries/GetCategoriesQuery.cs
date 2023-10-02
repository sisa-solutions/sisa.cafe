using System.Text.Json;

using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Blog.Domain.Specifications;
using Sisa.Common.Enums;
using Sisa.Common.Params;
using Sisa.Data;

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

        Sisa.Common.Params.SortingParams[] sortingParams =
        {
            new() {
                Field = "Name",
                Direction = SortDirection.Asc
            }
        };

        IEnumerable<Sisa.Data.SortingParams> orderBy = sortingParams.Select(x => new Sisa.Data.SortingParams
        {
            Field = x.Field,
            Direction = x.Direction switch
            {
                Sisa.Common.Enums.SortDirection.Asc => Sisa.Enums.SortDirection.ASC,
                Sisa.Common.Enums.SortDirection.Desc => Sisa.Enums.SortDirection.DESC,
                _ => throw new ArgumentOutOfRangeException(nameof(x.Direction), x.Direction, null)
            }
        });

        var specification = new CategorySpecification<CategoryResponse>(
            "",
            orderBy,
            query.Paging,
            CategoryProjections.Projection);

        var categories = await repository
            .PaginateAsync(specification, cancellationToken);

        return categories.ToListResponse();
    }
}
