using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;

namespace Sisa.Blog.Domain.Specifications;

public sealed class PostSpecification<TResult>(Expression<Func<Post, TResult>> selector)
    : Specification<Post, TResult>(selector) where TResult : class
{
    public PostSpecification(
        Guid id,
        Expression<Func<Post, TResult>> selector) : this(selector)
    {
        Builder
            .Where(x => x.Id == id);
    }

    public PostSpecification(
        string slug,
        Expression<Func<Post, TResult>> selector) : this(selector)
    {
        Builder
            .Where(x => x.Slug == slug);
    }

    public PostSpecification(
        IFilteringParams filteringParams
        , IEnumerable<ISortingParams> sortingParams
        , IPagingParams pagingParams
        , Expression<Func<Post, TResult>> selector) : this(selector)
    {
        Builder.Include(x => x.Category);
        Builder.Include(x => x.Tags);

        Builder.AsSplitQuery();
        Builder.Filter(filteringParams);

        if (sortingParams.Any())
        {
            Builder.Sort(sortingParams);
        }
        else
        {
            Builder.OrderBy(x => x.Title);
        }

        Builder.Paginate(pagingParams);
    }
}
