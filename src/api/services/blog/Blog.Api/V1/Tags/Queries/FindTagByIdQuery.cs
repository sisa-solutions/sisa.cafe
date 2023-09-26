using Microsoft.EntityFrameworkCore;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Api.V1.Tags.Queries;

public sealed partial class FindTagByIdQuery : IQuery<SingleTagResponse>
{
}

public class FindTagByIdQueryHandler(
    ITagRepository repository,
    ILogger<FindTagByIdQueryHandler> logger
) : IQueryHandler<FindTagByIdQuery, SingleTagResponse>
{
    public async ValueTask<SingleTagResponse> HandleAsync(FindTagByIdQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding Tag by id {Id}", query.Id);

        var tag = await repository
            .Query
            .ProjectToResponse()
            .SingleOrDefaultAsync(x => x.Id == query.Id, cancellationToken);

        if (tag is null)
        {
            logger.LogError("Tag with id {Id} not found", query.Id);

            throw new Exception("Tag not found");
        }

        return tag.MapToResponse();
    }
}
