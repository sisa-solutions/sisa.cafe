using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Extensions;

namespace Sisa.Blog.Domain.Specifications;

public sealed class CategorySpecification<TResult>(Expression<Func<Category, TResult>> selector)
    : Specification<Category, TResult>(selector) where TResult : class
{
    public CategorySpecification(
        Guid id,
        Expression<Func<Category, TResult>> selector) : this(selector)
    {
        Builder.Include(x => x.Parent)
            .Where(x => x.Id == id);
    }

    public CategorySpecification(
        string slug,
        Expression<Func<Category, TResult>> selector) : this(selector)
    {
        Builder.Include(x => x.Parent)
            .Where(x => x.Slug == slug);
    }

    public CategorySpecification(
        string keyword
        , IPagingParams pagingParams
        , Expression<Func<Category, TResult>> selector) : this(selector)
    {
        Builder.Include(x => x.Parent);

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            Builder.Where(x => x.Name.ILike($"%{keyword}%"));
        }

        Builder.OrderBy(x => x.Name)
            .Paginate(pagingParams);
    }
}
