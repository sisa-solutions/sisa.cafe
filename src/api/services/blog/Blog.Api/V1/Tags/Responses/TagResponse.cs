using System.Linq.Expressions;

using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Common.Responses;

namespace Sisa.Blog.Api.V1.Tags.Responses;

public static class TagProjections
{
    public static SingleTagResponse MapToResponse(this Tag tag)
    {
        return new SingleTagResponse()
        {
            Value = Projection.Compile().Invoke(tag)
        };
    }

    public static TagResponse MapToInfoResponse(this Tag tag)
    {
        return new TagResponse()
        {
            Id = tag.Id.ToString(),
            Slug = tag.Slug,
            Name = tag.Name,
            Description = tag.Description,
            PostCount = tag.PostCount
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
        var response = new ListTagsResponse()
        {
            Value = { tags },
            Paging = new PagingInfoResponse
            {
                ItemCount = tags.ItemCount,
                PageIndex = tags.PageIndex,
                PageSize = tags.PageSize,
                PageCount = tags.PageCount
            }
        };

        return response;
    }

    public static IQueryable<TagResponse> ProjectToResponse(this IQueryable<Tag> tags)
    {
        return tags.Select(Projection);
    }

    public static Expression<Func<Tag, TagResponse>> Projection
    {
        get
        {
            return x => new TagResponse
            {
                Id = x.Id.ToString(),
                Slug = x.Slug,
                Name = x.Name,
                Description = x.Description,
                PostCount = x.PostCount,

                Creator = new ActorInfoResponse()
                {
                    Id = x.CreatedBy.ToString(),
                    DisplayName = "Administrator",
                    Timestamp = x.CreatedAt.ToTimestamp()
                },
                Updater = x.UpdatedBy != null ? new ActorInfoResponse()
                {
                    Id = x.UpdatedBy.Value.ToString(),
                    DisplayName = "Administrator",
                    Timestamp = x.UpdatedAt!.Value.ToTimestamp()
                } : null,
            };
        }
    }
}
