using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Extensions;

namespace Sisa.Blog.Domain.Specifications;

public sealed class CategorySpecification<TResult>(Expression<Func<Category, TResult>> selector)
    : Specification<Category, TResult>(selector) where TResult : class
{
    public CategorySpecification(
        string keyword
        , IPagingParams pagingParams,
        Expression<Func<Category, TResult>> selector) : this(selector)
    {
        if (!string.IsNullOrWhiteSpace(keyword))
        {
            Builder.Where(x => x.Name.Like($"%{keyword}%"));
        }


        Builder.OrderBy(x => x.Name)
            .Paginate(pagingParams);
    }
}
