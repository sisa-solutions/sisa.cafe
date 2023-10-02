using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Api.V1.Posts.Responses;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Microsoft.EntityFrameworkCore;

namespace Sisa.Blog.Api.V1.Posts.Queries;

public sealed partial class GetPostsQuery : IQuery<ListPostsResponse>
{
}

public class GetTagsQueryHandler(
    IPostRepository repository,
    ILogger<GetTagsQueryHandler> logger
) : IQueryHandler<GetPostsQuery, ListPostsResponse>
{
    public async ValueTask<ListPostsResponse> HandleAsync(GetPostsQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Getting Tags");

        var queryBuilder = repository
            .Query
            .ProjectToResponse()
            .OrderBy(x => x.Title)
            .AsNoTracking();

        // if (!string.IsNullOrWhiteSpace(query.Filter.Keyword))
        // {
        //     logger.LogInformation("Filtering by Keyword: {Keyword}", query.Filter.Keyword);

        //     queryBuilder = queryBuilder.Where(x => EF.Functions.ILike(x.Title, $"%{query.Filter.Keyword}%"));
        // }

        // if (query.Filter.Categories.Count > 0)
        // {
        //     logger.LogInformation("Filtering by tags: {tags}", query.Filter.Categories);

        //     // filter all post that match any tags in the list
        //     queryBuilder = queryBuilder.Where(x => x.Categories.Any(y => query.Filter.Categories.Contains(y.Id)));
        // }

        // if (query.Filter.Tags.Count > 0)
        // {
        //     logger.LogInformation("Filtering by tags: {tags}", query.Filter.Tags);

        //     // filter all post that match any tags in the list
        //     queryBuilder = queryBuilder.Where(x => x.Tags.Any(y => query.Filter.Tags.Contains(y.Id)));
        // }

        IPaginatedList<PostResponse> posts = await queryBuilder
            .ToPaginatedListAsync(query.Paging.PageIndex, query.Paging.PageSize, cancellationToken);

        return posts.MapToResponse();
    }
}
