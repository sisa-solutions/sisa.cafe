using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Extensions;

namespace Sisa.Blog.Domain.Specifications;

public sealed class TagSpecification<TResult>(Expression<Func<Tag, TResult>> selector)
    : Specification<Tag, TResult>(selector) where TResult : class
{
    public TagSpecification(
        string keyword
        , IPagingParams pagingParams,
        Expression<Func<Tag, TResult>> selector) : this(selector)
    {
        if (!string.IsNullOrWhiteSpace(keyword))
        {
            Builder.Where(x => x.Name.Like($"%{keyword}%"));
        }

        Builder.OrderBy(x => x.Name)
            .Paginate(pagingParams);
    }
}
