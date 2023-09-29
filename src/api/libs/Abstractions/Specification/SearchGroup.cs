using System.Linq.Expressions;

namespace Sisa.Abstractions;

public enum LogicalOperator
{
    AND,
    OR
}

public sealed class SearchGroup<TEntity>(LogicalOperator logicalOperator = LogicalOperator.AND)
    where TEntity : class
{
    private readonly List<SearchExpression<TEntity>> _expressions = [];
    public IReadOnlyCollection<SearchExpression<TEntity>> Expressions => _expressions;

    public LogicalOperator LogicalOperator { get; private set; } = logicalOperator;

    private readonly List<SearchGroup<TEntity>> _groups = [];
    public IReadOnlyCollection<SearchGroup<TEntity>> Groups => _groups;

    public SearchGroup<TEntity> Add(SearchExpression<TEntity> expression)
    {
        _expressions.Add(expression);

        return this;
    }

    public SearchGroup<TEntity> Add(
        Expression<Func<TEntity, string>> expression
        , string searchTerm, SearchType searchType = SearchType.CONTAINS
        , bool isCaseSensitive = false)
    {
        _expressions
            .Add(new SearchExpression<TEntity>(expression, searchTerm, searchType, isCaseSensitive));

        return this;
    }

    public SearchGroup<TEntity> Add(SearchGroup<TEntity> group)
    {
        _groups
            .Add(group);

        return this;
    }

    public SearchGroup<TEntity> And(SearchGroup<TEntity> group)
    {
        return Add(group);
    }

    public SearchGroup<TEntity> Or(SearchGroup<TEntity> group)
    {
        return Add(group);
    }
}
