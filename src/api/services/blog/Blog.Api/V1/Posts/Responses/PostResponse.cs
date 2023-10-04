using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Api.V1.Comments.Responses;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Common.Responses;

namespace Sisa.Blog.Api.V1.Posts.Responses;

public sealed partial class PostResponse
{
    public PostResponse(IEnumerable<string> tags) : base()
    {
        Tags.AddRange(tags);
    }
}

public static class PostProjections
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
        var response = new ListPostsResponse()
        {
            Value = { posts },
            Paging = new PagingInfoResponse
            {
                ItemCount = posts.ItemCount,
                PageIndex = posts.PageIndex,
                PageSize = posts.PageSize,
                PageCount = posts.PageCount
            }
        };

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
            return x => new PostResponse(x.TagSlugs)
            {
                Id = x.Id.ToString(),
                Title = x.Title,
                Slug = x.Slug,
                Excerpt = x.Excerpt,
                Content = x.Content,

                Category = new CategoryInfoResponse
                {
                    Id = x.Category.Id.ToString(),
                    Name = x.Category.Name,
                    Slug = x.Category.Slug,
                    Description = x.Category.Description
                },
            };
        }
    }
}
