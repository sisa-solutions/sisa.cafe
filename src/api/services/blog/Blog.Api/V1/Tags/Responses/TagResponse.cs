using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Grpc.Responses;

namespace Sisa.Blog.Api.V1.Tags.Responses;

public static class TagProjectionExtensions
{
    public static SingleTagResponse MapToResponse(this Tag tag)
    {
        return new SingleTagResponse()
        {
            Value = Projection.Compile().Invoke(tag)
        };
    }

    public static SingleTagResponse MapToResponse(this TagResponse tag)
    {
        return new SingleTagResponse()
        {
            Value = tag
        };
    }

    public static ListTagsResponse MapToResponse(this IPaginatedList<TagResponse> tags)
    {
        var paging = new PagingResponse
        {
            Count = tags.Count,
            Page = tags.Page,
            PageSize = tags.PageSize,
            PageCount = tags.PageCount
        };

        var response = new ListTagsResponse()
        {
            Paging = paging
        };

        response.Value.AddRange(tags);

        return response;
    }

    public static IQueryable<TagResponse> ProjectToResponse(this IQueryable<Tag> tags)
    {
        return tags.Select(Projection);
    }

    private static Expression<Func<Tag, TagResponse>> Projection
    {
        get
        {
            return x => new TagResponse
            {
                Id = x.Id.ToString(),
                Slug = x.Slug,
                Name = x.Name,
                Description = x.Description,
            };
        }
    }
}
