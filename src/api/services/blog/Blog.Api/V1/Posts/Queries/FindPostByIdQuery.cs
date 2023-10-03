using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Api.V1.Posts.Responses;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;

namespace Sisa.Blog.Api.V1.Posts.Queries;

public sealed partial class FindPostByIdQuery : IQuery<SinglePostResponse>
{
    public Guid PostId => Guid.TryParse(Id, out var id) ? id : Guid.Empty;
}

public class FindPostByIdQueryHandler(
    IPostRepository repository,
    ILogger<FindPostByIdQueryHandler> logger
) : IQueryHandler<FindPostByIdQuery, SinglePostResponse>
{
    public async ValueTask<SinglePostResponse> HandleAsync(FindPostByIdQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding Post by id {Id}", query.Id);

        var post = await repository.FindAsync(
            x => x.Id == query.PostId
            , PostProjections.Projection
            , cancellationToken);

        if (post is null)
        {
            logger.LogError("Post with id {Id} not found", query.Id);

            throw new Exception("Post not found");
        }

        return post.MapToResponse();
    }
}
