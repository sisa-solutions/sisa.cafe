using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Domain.Specifications;

public sealed class TagSpecification<TResult>(Expression<Func<Tag, TResult>> selector)
    : Specification<Tag, TResult>(selector) where TResult : class
{
    public TagSpecification(
        Guid id,
        Expression<Func<Tag, TResult>> selector) : this(selector)
    {
        Builder
            .Where(x => x.Id == id);
    }

    public TagSpecification(
        string slug,
        Expression<Func<Tag, TResult>> selector) : this(selector)
    {
        Builder
            .Where(x => x.Slug == slug);
    }

    public TagSpecification(
        IFilteringParams filteringParams
        , IEnumerable<ISortingParams> sortingParams
        , IPagingParams pagingParams
        , Expression<Func<Tag, TResult>> selector) : this(selector)
    {
        Builder
           .Filter(filteringParams);

        if (sortingParams.Any())
        {
            Builder.Sort(sortingParams);
        }
        else
        {
            Builder.OrderBy(x => x.Name);
        }

        Builder
            .Sort(sortingParams)
            .Paginate(pagingParams);
    }
}
