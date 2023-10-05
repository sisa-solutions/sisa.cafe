using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;

namespace Sisa.Blog.Domain.Specifications;

public sealed class CommentSpecification : Specification<Comment>
{
    public CommentSpecification(Guid id)
    {
        Builder
            .Include(x => x.Post)
            .Where(x => x.Id == id);
    }
}


public sealed class CommentSpecification<TResult>(Expression<Func<Comment, TResult>> selector)
    : Specification<Comment, TResult>(selector) where TResult : class
{
    public CommentSpecification(
        Guid postId
        , IPagingParams pagingParams
        , Expression<Func<Comment, TResult>> selector) : this(selector)
    {
        Builder
            .Where(x => x.PostId == postId)
            .Paginate(pagingParams);
    }
}
