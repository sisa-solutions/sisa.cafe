using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Grpc.Responses;

namespace Sisa.Blog.Api.V1.Posts.Responses;

public static class PostProjectionExtensions
{
    public static SinglePostResponse MapToResponse(this Post post)
    {
        return new SinglePostResponse()
        {
            Value = Projection.Compile().Invoke(post)
        };
    }

    public static SinglePostResponse MapToResponse(this PostResponse post)
    {
        return new SinglePostResponse()
        {
            Value = post
        };
    }

    public static ListPostsResponse MapToResponse(this IPaginatedList<PostResponse> posts)
    {
        var paging = new PagingResponse
        {
            Count = posts.ItemCount,
            Page = posts.PageIndex,
            PageSize = posts.PageSize,
            PageCount = posts.PageCount
        };

        var response = new ListPostsResponse()
        {
            Paging = paging
        };

        response.Value.AddRange(posts);

        return response;
    }

    public static IQueryable<PostResponse> ProjectToResponse(this IQueryable<Post> query)
    {
        return query.Select(Projection);
    }

    public static Expression<Func<Post, PostResponse>> Projection
    {
        get
        {
            return x => new PostResponse
            {
                Id = x.Id.ToString(),
                CategoryId = x.CategoryId.ToString(),
                Title = x.Title,
                Slug = x.Slug,
                Excerpt = x.Excerpt,
                Content = x.Content,

                Category = x.Category.MapToInfoResponse(),
                Tags = {
                    x.PostTags.Select(x => x.Tag.MapToInfoResponse())
                }
            };
        }
    }
}
