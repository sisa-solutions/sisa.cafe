using System.Linq.Expressions;

namespace Sisa.Abstractions;

public class SpecificationBuilder<TEntity>(Specification<TEntity> specification) : ISpecificationBuilder<TEntity>
    where TEntity : class
{
    private readonly Specification<TEntity> _specification = specification;

    public SpecificationBuilder<TEntity> Include(Expression<Func<TEntity, object?>> includeExpression)
    {
        _specification.AddInclude(includeExpression);

        return this;
    }

    public SpecificationBuilder<TEntity> Include(string includeString)
    {
        _specification.AddInclude(includeString);

        return this;
    }

    public SpecificationBuilder<TEntity> Where(Expression<Func<TEntity, bool>> criteria)
    {
        _specification.ApplyCriteria(criteria);

        return this;
    }

    public SpecificationBuilder<TEntity> Like(Expression<Func<TEntity, string>> likeExpression, string value)
    {
        _specification.Like(likeExpression, $"%{value}%");

        return this;
    }

    public SpecificationBuilder<TEntity> StartWith(Expression<Func<TEntity, string>> likeExpression, string value)
    {
        _specification.Like(likeExpression, $"{value}%");

        return this;
    }

    public SpecificationBuilder<TEntity> EndWith(Expression<Func<TEntity, string>> likeExpression, string value)
    {
        _specification.Like(likeExpression, $"%{value}");

        return this;
    }

    public SpecificationBuilder<TEntity> OrderBy(Expression<Func<TEntity, object>> orderByExpression)
    {
        _specification.ApplyOrderBy(orderByExpression);

        return this;
    }

    public SpecificationBuilder<TEntity> OrderByDescending(Expression<Func<TEntity, object>> orderByDescendingExpression)
    {
        _specification.ApplyOrderByDescending(orderByDescendingExpression);

        return this;
    }

    public SpecificationBuilder<TEntity> GroupBy(Expression<Func<TEntity, object>> groupByExpression)
    {
        _specification.ApplyGroupBy(groupByExpression);

        return this;
    }

    public SpecificationBuilder<TEntity> Search(Expression<Func<TEntity, string>> searchExpression, string searchTerm)
    {
        _specification.Search(searchExpression, searchTerm);

        return this;
    }

    public SpecificationBuilder<TEntity> Search(Expression<Func<TEntity, string>> searchExpression, string searchTerm, SearchType searchType)
    {
        _specification.Search(searchExpression, searchTerm, searchType);

        return this;
    }

    public SpecificationBuilder<TEntity> Search(Expression<Func<TEntity, string>> searchExpression, string searchTerm, SearchType searchType, bool isCaseSensitive)
    {
        _specification.Search(searchExpression, searchTerm, searchType, isCaseSensitive);

        return this;
    }

    public SpecificationBuilder<TEntity> Search(SearchExpression<TEntity> searchExpression)
    {
        _specification.Search(searchExpression);

        return this;
    }

    public SpecificationBuilder<TEntity> Search(SearchGroup<TEntity> searchGroup)
    {
        _specification.Search(searchGroup);

        return this;
    }

    public SpecificationBuilder<TEntity> And(ISpecification<TEntity> specification)
    {
        _specification.And(specification);

        return this;
    }

    public SpecificationBuilder<TEntity> Or(ISpecification<TEntity> specification)
    {
        _specification.Or(specification);

        return this;
    }

    public SpecificationBuilder<TEntity> AsNoTracking()
    {
        _specification.AsNoTracking();

        return this;
    }

    public SpecificationBuilder<TEntity> AsSplitQuery()
    {
        _specification.AsSplitQuery();

        return this;
    }

    public SpecificationBuilder<TEntity> TagWith(string tag)
    {
        _specification.TagWith(tag);

        return this; ;
    }
}
