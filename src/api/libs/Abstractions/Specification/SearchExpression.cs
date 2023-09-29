using System.Linq.Expressions;

namespace Sisa.Abstractions;

public enum SearchType
{
    CONTAINS,
    STARTS_WITH,
    ENDS_WITH
}

public sealed class SearchExpression<TEntity>(
    Expression<Func<TEntity, string>> expression
    , string searchTerm
    , SearchType searchType
    , bool isCaseSensitive
) where TEntity : class
{
    public Expression<Func<TEntity, string>> Expression { get; set; } = expression;
    public string SearchTerm { get; set; } = searchTerm;

    public SearchType SearchType { get; set; } = searchType;

    public bool IsCaseSensitive { get; set; } = isCaseSensitive;

    public Func<TEntity, string> SelectorFunc => Expression.Compile();
}
