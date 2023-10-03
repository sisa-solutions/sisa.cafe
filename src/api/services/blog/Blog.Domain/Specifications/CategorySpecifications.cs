using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

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
        IFilteringParams filteringParams
        , IEnumerable<ISortingParams> sortingParams
        , IPagingParams pagingParams
        , Expression<Func<Category, TResult>> selector) : this(selector)
    {
        Builder
            .Include(x => x.Parent)
            .Filter(filteringParams)
            .Sort(sortingParams)
            .Paginate(pagingParams);
    }
}
