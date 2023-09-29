using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Microsoft.EntityFrameworkCore;

namespace Sisa.Blog.Api.V1.Tags.Queries;

public sealed partial class GetTagsQuery : IQuery<ListTagsResponse>
{
}

public class GetTagsQueryHandler(
    ITagRepository repository,
    ILogger<GetTagsQueryHandler> logger
) : IQueryHandler<GetTagsQuery, ListTagsResponse>
{
    public async ValueTask<ListTagsResponse> HandleAsync(GetTagsQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Getting Tags");

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

        IPaginatedList<TagResponse> tags = await queryBuilder
            .ToPaginatedListAsync(query.Paging.PageIndex, query.Paging.PageSize, cancellationToken);

        return tags.MapToResponse();
    }
}
