using Microsoft.EntityFrameworkCore;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Api.V1.Tags.Queries;

public sealed partial class FindTagBySlugQuery : IQuery<SingleTagResponse>
{
}

public class FindTagBySlugQueryHandler(
    ITagRepository repository,
    ILogger<FindTagBySlugQueryHandler> logger
) : IQueryHandler<FindTagBySlugQuery, SingleTagResponse>
{
    public async ValueTask<SingleTagResponse> HandleAsync(FindTagBySlugQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding Tag by slug {Slug}", query.Slug);

        var tag = await repository
            .Query
            .ProjectToResponse()
            .SingleOrDefaultAsync(x => x.Slug == query.Slug, cancellationToken);

        if (tag is null)
        {
            logger.LogError("Tag with slug {Slug} not found", query.Slug);

            throw new Exception("Tag not found");
        }

        return tag.MapToResponse();
    }
}
