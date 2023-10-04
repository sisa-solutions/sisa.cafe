using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Api.V1.Posts.Responses;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.Specifications;

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

        var spec = new PostSpecification<PostResponse>(
            query.Filter,
            query.SortBy,
            query.Paging,
            PostProjections.Projection);

        var posts = await repository
            .PaginateAsync(spec, cancellationToken);

        return posts.MapToResponse();
    }
}
