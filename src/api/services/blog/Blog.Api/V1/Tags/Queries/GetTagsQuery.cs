using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Blog.Domain.Specifications;

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

        var spec = new TagSpecification<TagResponse>(
            query.Filter,
            query.SortBy,
            query.Paging,
            TagProjections.Projection
        );

        IPaginatedList<TagResponse> tags = await repository
            .PaginateAsync(spec, cancellationToken);

        return tags.MapToResponse();
    }
}
