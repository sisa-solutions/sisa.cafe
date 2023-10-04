using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;
using Sisa.Common.Responses;

namespace Sisa.Blog.Api.V1.Comments.Responses;

public static class CommentProjections
{
    public static SingleCommentResponse MapToResponse(this Comment comment)
    {
        return new SingleCommentResponse()
        {
            Value = Projection.Compile().Invoke(comment)
        };
    }

    public static SingleCommentResponse MapToResponse(this CommentResponse comment)
    {
        return new SingleCommentResponse()
        {
            Value = comment
        };
    }

    public static ListCommentsResponse MapToResponse(this IPaginatedList<CommentResponse> comments)
    {
        var response = new ListCommentsResponse()
        {
            Value = { comments },
            Paging = new PagingInfoResponse
            {
                ItemCount = comments.ItemCount,
                PageIndex = comments.PageIndex,
                PageSize = comments.PageSize,
                PageCount = comments.PageCount
            }
        };

        return response;
    }

    public static IQueryable<CommentResponse> ProjectToResponse(this IQueryable<Comment> query)
    {
        return query.Select(Projection);
    }

    public static Expression<Func<Comment, CommentResponse>> Projection
    {
        get
        {
            return x => new CommentResponse()
            {
                Id = x.Id.ToString(),
                Content = x.Content,

                ParentId = x.ParentId != null ? x.ParentId.ToString() : null,
                PostId = x.PostId.ToString(),
            };
        }
    }
}
