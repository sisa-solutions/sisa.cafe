using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Api.V1.Posts.Responses;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.Specifications;

namespace Sisa.Blog.Api.V1.Posts.Queries;

public sealed partial class GetPublishedPostsQuery : IQuery<ListPostsResponse>
{
}

public class GetPublishedPostsQueryHandler(
    IPostRepository repository,
    ILogger<GetPublishedPostsQueryHandler> logger
) : IQueryHandler<GetPublishedPostsQuery, ListPostsResponse>
{
    public async ValueTask<ListPostsResponse> HandleAsync(GetPublishedPostsQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Getting Tags");

        var spec = new PublishedPostSpecification<PostResponse>(
            query.Filter,
            query.Paging,
            PostProjections.Projection);

        var posts = await repository
            .PaginateAsync(spec, cancellationToken);

        return posts.MapToResponse();
    }
}
