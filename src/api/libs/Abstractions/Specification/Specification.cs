using System.Linq.Expressions;

namespace Sisa.Abstractions;

public class Specification<TEntity> : ISpecification<TEntity>
    where TEntity : class
{
    public virtual ISpecificationBuilder<TEntity> Builder { get; }


    public Specification()
    {
        Builder = new SpecificationBuilder<TEntity>(this);
    }

    /// <summary>
    /// OrderBy is the expression that will be used to order the data
    /// </summary>
    public List<Expression<Func<TEntity, object?>>> Includes { get; } = [];

    /// <summary>
    /// OrderBy is the expression that will be used to order the data
    /// </summary>
    public List<string> IncludeStrings { get; } = [];

    /// <summary>
    /// OrderBy is the expression that will be used to order the data
    /// </summary>
    public Expression<Func<TEntity, bool>>? Criteria { get; private set; }

    /// <summary>
    /// OrderBy is the expression that will be used to order the data
    /// </summary>
    public Expression<Func<TEntity, object>>? OrderBy { get; private set; }

    /// <summary>
    /// OrderBy is the expression that will be used to order the data
    /// </summary>
    public Expression<Func<TEntity, object>>? OrderByDescending { get; private set; }

    /// <summary>
    /// OrderBy is the expression that will be used to order the data
    /// </summary>
    public Expression<Func<TEntity, object>>? GroupBy { get; private set; }

    public SearchGroup<TEntity> SearchGroup { get; private set; } = new();

    /// <summary>
    /// EnableTracking is a boolean value that indicates if tracking is enabled
    /// </summary>
    public bool EnableTracking { get; private set; } = true;

    /// <summary>
    /// SplitQuery is a boolean value that indicates if split query is enabled
    /// </summary>
    public bool EnableSplitQuery { get; private set; } = true;

    /// <summary>
    /// Tag is a string that can be used to tag a specification
    /// </summary>
    public string Tag { get; private set; } = string.Empty;

    /// <summary>
    /// Include is the expression that will be used to include the data
    /// </summary>
    /// <param name="includeExpression"></param>
    public virtual void AddInclude(Expression<Func<TEntity, object?>> includeExpression)
        => Includes.Add(includeExpression);

    /// <summary>
    /// Include is the expression that will be used to include the data
    /// </summary>
    /// <param name="includeString"></param>
    public virtual void AddInclude(string includeString)
        => IncludeStrings.Add(includeString);

    /// <summary>
    /// Criteria is the expression that will be used to filter the data
    /// </summary>
    /// <param name="criteria"></param>
    public virtual void ApplyCriteria(Expression<Func<TEntity, bool>> criteria)
        => Criteria = criteria;

    /// <summary>
    /// Search is the expression that will be used to search the data
    /// </summary>
    /// <param name="likeExpression"></param>
    /// <param name="value"></param>
    /// <exception cref="ArgumentNullException"></exception>
    public virtual void Like(Expression<Func<TEntity, string>> likeExpression, string value)
    {
        if (likeExpression is null)
        {
            throw new ArgumentNullException(nameof(likeExpression));
        }

        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentNullException(nameof(value));
        }

        var searchTermLowercase = value.ToLowerInvariant();

        Expression<Func<TEntity, bool>> searchCriteria = x => likeExpression
            .Compile()(x)
            .ToLowerInvariant()
            .Contains(searchTermLowercase);

        if (Criteria is null)
        {
            Criteria = searchCriteria;
        }
        else
        {
            var newCriteria = Expression.AndAlso(Criteria.Body, searchCriteria.Body);

            Criteria = Expression.Lambda<Func<TEntity, bool>>(newCriteria, Criteria.Parameters);
        }
    }

    /// <summary>
    /// OrderBy is the expression that will be used to order the data
    /// </summary>
    /// <param name="orderByExpression"></param>
    public virtual void ApplyOrderBy(Expression<Func<TEntity, object>> orderByExpression)
        => OrderBy = orderByExpression;

    /// <summary>
    /// OrderBy is the expression that will be used to order the data
    /// </summary>
    /// <param name="orderByDescendingExpression"></param>
    public virtual void ApplyOrderByDescending(Expression<Func<TEntity, object>> orderByDescendingExpression)
        => OrderByDescending = orderByDescendingExpression;

    /// <summary>
    /// GroupBy is the expression that will be used to group the data
    /// </summary>
    /// <param name="groupByExpression"></param>
    public virtual void ApplyGroupBy(Expression<Func<TEntity, object>> groupByExpression)
        => GroupBy = groupByExpression;

    public virtual void Search(Expression<Func<TEntity, string>> searchExpression, string searchTerm)
        => SearchGroup.Add(searchExpression, searchTerm);

    public virtual void Search(Expression<Func<TEntity, string>> searchExpression, string searchTerm, SearchType searchType)
        => SearchGroup.Add(searchExpression, searchTerm, searchType);

    public virtual void Search(Expression<Func<TEntity, string>> searchExpression, string searchTerm, SearchType searchType, bool isCaseSensitive)
        => SearchGroup.Add(searchExpression, searchTerm, searchType, isCaseSensitive);

    public virtual void Search(SearchExpression<TEntity> searchExpression)
        => SearchGroup.Add(searchExpression);

    public virtual void Search(SearchGroup<TEntity> searchGroup)
        => SearchGroup.Add(searchGroup);

    public virtual ISpecification<TEntity> And(ISpecification<TEntity> specification)
    {
        if (specification.Criteria is null)
        {
            throw new ArgumentNullException(nameof(specification.Criteria));
        }

        if (Criteria is null)
        {
            Criteria = specification.Criteria;
        }
        else
        {
            var newCriteria = Expression.AndAlso(Criteria.Body, specification.Criteria.Body);

            Criteria = Expression.Lambda<Func<TEntity, bool>>(newCriteria, Criteria.Parameters);
        }

        return this;
    }

    public virtual ISpecification<TEntity> Or(ISpecification<TEntity> specification)
    {
        if (specification.Criteria is null)
        {
            throw new ArgumentNullException(nameof(specification.Criteria));
        }

        if (Criteria is null)
        {
            Criteria = specification.Criteria;
        }
        else
        {
            var newCriteria = Expression.OrElse(Criteria.Body, specification.Criteria.Body);

            Criteria = Expression.Lambda<Func<TEntity, bool>>(newCriteria, Criteria.Parameters);
        }

        return this;
    }

    public virtual void AsNoTracking()
        => EnableTracking = false;

    public virtual void AsSplitQuery()
        => EnableTracking = false;

    /// <summary>
    /// Tag is a string that can be used to tag a specification
    /// </summary>
    /// <param name="tag"></param>
    public virtual void TagWith(string tag)
        => Tag = tag;
}

public class Specification<TEntity, TResult>(Expression<Func<TEntity, TResult>> selector) : Specification<TEntity>, ISpecification<TEntity, TResult>
    where TEntity : class
{
    public Expression<Func<TEntity, TResult>>? Selector { get; private set; } = selector;
}