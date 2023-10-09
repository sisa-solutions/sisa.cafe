using System.Linq.Expressions;

using Sisa.Abstractions;

using File = Sisa.Blog.Domain.AggregatesModel.FileAggregate.File;

namespace Sisa.Blog.Domain.Specifications;

public sealed class FileSpecification<TResult>(Expression<Func<File, TResult>> selector)
    : Specification<File, TResult>(selector) where TResult : class
{
    public FileSpecification(
        Guid id,
        Expression<Func<File, TResult>> selector) : this(selector)
    {
        Builder
            .Where(x => x.Id == id);
    }

    public FileSpecification(
        IFilteringParams filteringParams
        , IEnumerable<ISortingParams> sortingParams
        , IPagingParams pagingParams
        , Expression<Func<File, TResult>> selector) : this(selector)
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
