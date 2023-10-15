using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Api.V1.Posts.Responses;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.Specifications;

namespace Sisa.Blog.Api.V1.Posts.Queries;

public sealed partial class FindPublishedPostBySlugQuery : IQuery<SinglePostResponse>
{
}

public sealed class FindPublishedPostBySlugQueryValidator : AbstractValidator<FindPublishedPostBySlugQuery>
{
    public FindPublishedPostBySlugQueryValidator()
    {
    }
}

public class FindPublishedPostBySlugQueryHandler(
    IPostRepository repository,
    ILogger<FindPublishedPostBySlugQueryHandler> logger
) : IQueryHandler<FindPublishedPostBySlugQuery, SinglePostResponse>
{
    public async ValueTask<SinglePostResponse> HandleAsync(FindPublishedPostBySlugQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding Post by slug {Slug}", query.Slug);

        var spec = new PublishedPostSpecification<PostResponse>(
           query.Slug,
           PostProjections.Projection);

        var post = await repository.FindAsync(spec, cancellationToken);

        if (post is null)
        {
            logger.LogError("Post with slug {Slug} not found", query.Slug);

            throw new Exception("Post not found");
        }

        return post.MapToResponse();
    }
}
