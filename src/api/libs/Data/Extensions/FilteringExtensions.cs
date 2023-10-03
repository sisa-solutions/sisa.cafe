using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Enums;

namespace Sisa.Data;

public static partial class FilteringExtensions
{
    public static IQueryable<TEntity> Where<TEntity>(this IQueryable<TEntity> query, IFilteringParams filteringParams)
    {
        var filterExpression = filteringParams.ParseFiltering<TEntity>();

        return query.Where(filterExpression);
    }

    public static Expression<Func<TEntity, bool>> ParseFiltering<TEntity>(this IFilteringParams filteringParams)
    {
        if (filteringParams == null || filteringParams.Rules == null || !filteringParams.Rules.Any())
        {
            throw new ArgumentException("No filtering parameters specified.");
        }

        ParameterExpression param = Expression.Parameter(typeof(TEntity), "x");
        Expression? combinedExpression = null;

        foreach (var filterRule in filteringParams.Rules)
        {
            Expression ruleExpression = BuildFilterExpression(param, filterRule);

            if (combinedExpression == null)
            {
                combinedExpression = ruleExpression;
            }
            else
            {
                if (filteringParams.Combinator == Combinator.And)
                {
                    combinedExpression = Expression.AndAlso(combinedExpression, ruleExpression);
                }
                else if (filteringParams.Combinator == Combinator.Or)
                {
                    combinedExpression = Expression.OrElse(combinedExpression, ruleExpression);
                }
            }
        }

        if (combinedExpression == null)
        {
            throw new InvalidOperationException("No filtering parameters specified.");
        }

        if (filteringParams.Not)
        {
            combinedExpression = Expression.Not(combinedExpression);
        }

        return Expression.Lambda<Func<TEntity, bool>>(combinedExpression, param);
    }

    private static Expression BuildFilterExpression(ParameterExpression param, IFilterRule filterRule)
    {
        Expression property = Expression.Property(param, filterRule.Field);
        Expression value = Expression.Constant(filterRule.Value);
        Expression operation = BuildOperationExpression(property, value, filterRule.Operator);

        if (filterRule.Not)
        {
            operation = Expression.Not(operation);
        }

        return operation;
    }

    private static Expression BuildOperationExpression(Expression left, Expression right, Operator op)
        => op switch
        {
            Operator.Equal => Expression.Equal(left, right),
            Operator.NotEqual => Expression.NotEqual(left, right),
            Operator.GreaterThan => Expression.GreaterThan(left, right),
            Operator.GreaterThanOrEqual => Expression.GreaterThanOrEqual(left, right),
            Operator.LessThan => Expression.LessThan(left, right),
            Operator.LessThanOrEqual => Expression.LessThanOrEqual(left, right),
            // Handle other operators as needed
            _ => throw new ArgumentException($"Unsupported operator: {op}"),
        };
}
