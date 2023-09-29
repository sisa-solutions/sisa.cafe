using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;

using Microsoft.EntityFrameworkCore;

using Sisa.Abstractions;
using Sisa.Extensions;

namespace Sisa.Data;

public static partial class SpecificationExtensions
{
    public static IQueryable<TEntity> Specify<TEntity>(this IQueryable<TEntity> query, ISpecification<TEntity> specification)
        where TEntity : class, IEntity
    {
        // Apply includes
        query = specification.Includes
            .Aggregate(query, (current, include) => current.Include(include));

        // Apply include strings
        query = specification.IncludeStrings
            .Aggregate(query, (current, include) => current.Include(include));

        // Apply criteria
        if (specification.Criteria != null)
        {
            query = query
                .Where(specification.Criteria);
        }

        // Apply ordering if expressions are set
        if (specification.OrderBy != null)
        {
            query = query
                .OrderBy(specification.OrderBy);
        }
        else if (specification.OrderByDescending != null)
        {
            query = query
                .OrderByDescending(specification.OrderByDescending);
        }

        // Apply GroupBy
        if (specification.GroupBy != null)
        {
            query = query
                .GroupBy(specification.GroupBy)
                .SelectMany(x => x);
        }

        if (specification.SearchGroup.Expressions.Count != 0 || specification.SearchGroup.Groups.Count != 0)
        {
            var searchExpression = SearchTranslate(specification.SearchGroup);

            query = query
                .Where(searchExpression);
        }

        if (!specification.EnableTracking)
        {
            query = query
                .AsNoTracking();
        }

        if (!string.IsNullOrWhiteSpace(specification.Tag))
        {
            query = query
                .TagWith(specification.Tag);
        }

        return query;
    }

    public static IQueryable<TResult> Specify<TEntity, TResult>(this IQueryable<TEntity> query, ISpecification<TEntity, TResult> specification)
        where TEntity : class, IEntity
    {
        if (specification.Selector is null)
        {
            throw new ArgumentNullException(nameof(specification.Selector));
        }

        // Apply includes
        query = specification.Includes
            .Aggregate(query, (current, include) => current.Include(include));

        // Apply include strings
        query = specification.IncludeStrings
            .Aggregate(query, (current, include) => current.Include(include));

        // Apply criteria
        if (specification.Criteria != null)
        {
            query = query
                .Where(specification.Criteria);
        }

        // Apply ordering if expressions are set
        if (specification.OrderBy != null)
        {
            query = query
                .OrderBy(specification.OrderBy);
        }
        else if (specification.OrderByDescending != null)
        {
            query = query
                .OrderByDescending(specification.OrderByDescending);
        }

        if (specification.SearchGroup.Expressions.Count != 0 || specification.SearchGroup.Groups.Count != 0)
        {
            var searchExpression = SearchTranslate(specification.SearchGroup);

            query = query
                .Where(searchExpression);
        }

        // Apply GroupBy
        if (specification.GroupBy != null)
        {
            query = query
                .GroupBy(specification.GroupBy)
                .SelectMany(x => x);
        }

        if (!specification.EnableTracking)
        {
            query = query
                .AsNoTracking();
        }

        if (!string.IsNullOrWhiteSpace(specification.Tag))
        {
            query = query
                .TagWith(specification.Tag);
        }

        return query
            .Select(specification.Selector!);
    }

    // public static Expression<Func<TEntity, bool>> Like<TEntity>(
    //     Expression<Func<TEntity, string>> propertySelector, string searchTerm)
    // {
    //     return entity => EF.Functions.Like(propertySelector.Compile()(entity), $"%{searchTerm}%");
    // }

    // public static Expression<Func<TEntity, bool>> StartWith<TEntity>(
    //     Expression<Func<TEntity, string>> propertySelector, string searchTerm)
    // {
    //     return entity => EF.Functions.Like(propertySelector.Compile()(entity), $"{searchTerm}%");
    // }

    // public static Expression<Func<TEntity, bool>> EndWith<TEntity>(
    //     Expression<Func<TEntity, string>> propertySelector, string searchTerm)
    // {
    //     return entity => EF.Functions.Like(propertySelector.Compile()(entity), $"%{searchTerm}");
    // }

    // implement Like, StartWith and EndWith with pure c#endregion

    private static Expression<Func<TEntity, bool>> SearchTranslate<TEntity>(SearchExpression<TEntity> searchExpression)
        where TEntity : class
    {
        var parameter = searchExpression.Expression.Parameters.First();

        var searchPattern = searchExpression.SearchType switch
        {
            SearchType.CONTAINS => $"%{searchExpression.SearchTerm}%",
            SearchType.STARTS_WITH => $"{searchExpression.SearchTerm}%",
            SearchType.ENDS_WITH => $"%{searchExpression.SearchTerm}",
            _ => throw new NotImplementedException()
        };

        var body = Expression.Call(
            typeof(DbFunctionsExtensions),
            searchExpression.IsCaseSensitive ? "Like" : "ILike",
            Type.EmptyTypes,
            Expression.Default(typeof(DbFunctions)),
            Expression.Property(parameter, (searchExpression.Expression.Body! as MemberExpression)!.Member.Name),
            Expression.Constant(searchPattern, typeof(string))
        );

        return Expression.Lambda<Func<TEntity, bool>>(body, parameter);
    }

    private static Expression<Func<TEntity, bool>> SearchTranslate<TEntity>(SearchGroup<TEntity> group)
        where TEntity : class
    {
        var childGroups = group.Groups;
        var expressions = group.Expressions;
        var logicalOperator = group.LogicalOperator;

        // recursive call to translate child groups and its expression then combine both of expressions and childs expressions with logical operator
        // to single expression

        if (childGroups.Count != 0)
        {
            var allExpressions = expressions
                .Select(x => SearchTranslate(x))
                .Union(childGroups.Select(x => SearchTranslate(x)));

            if (logicalOperator == LogicalOperator.AND)
            {
                return allExpressions
                    .Aggregate((current, expression) => current.And(expression));
            }
            else if (logicalOperator == LogicalOperator.OR)
            {
                return allExpressions
                    .Aggregate((current, expression) => current.Or(expression));
            }
            else
            {
                throw new InvalidOperationException();
            }
        }
        else
        {
            if (logicalOperator == LogicalOperator.AND)
            {
                return expressions
                    .Select(searchExpression => SearchTranslate(searchExpression))
                    .Aggregate((current, expression) => current.And(expression));
            }
            else if (logicalOperator == LogicalOperator.OR)
            {
                return expressions
                    .Select(searchExpression => SearchTranslate(searchExpression))
                    .Aggregate((current, expression) => current.Or(expression));
            }
            else
            {
                throw new InvalidOperationException();
            }
        }
    }

    // private static Expression<Func<TEntity, bool>> SearchTranslate<TEntity>(IEnumerable<SearchExpression<TEntity>> searchExpressions, LogicalOperator logicalOperator)
    //     where TEntity : class
    // {
    //     if (logicalOperator == LogicalOperator.AND)
    //     {
    //         ParameterExpression param = Expression.Parameter(typeof(TEntity), "x");

    //         return searchExpressions
    //             .Select(searchExpression => SearchTranslate(searchExpression))
    //             .Aggregate((current, expression) => current.And(expression));
    //     }
    //     else if (logicalOperator == LogicalOperator.OR)
    //     {
    //         return searchExpressions
    //             .Select(searchExpression => SearchTranslate(searchExpression))
    //             .Aggregate((current, expression) => current.Or(expression));
    //     }
    //     else
    //     {
    //         throw new InvalidOperationException();
    //     }
    // }
}

public class ReplaceVisitor(Expression from, Expression to) : ExpressionVisitor
{
    private readonly Expression _from = from, _to = to;

    [return: NotNullIfNotNull("node")]
    public override Expression? Visit(Expression? node)
    {
        return node == _from ? _to : base.Visit(node);
    }
}
