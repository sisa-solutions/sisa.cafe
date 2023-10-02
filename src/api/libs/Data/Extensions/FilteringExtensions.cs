using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Enums;

namespace Sisa.Data;

public static partial class FilteringExtensions
{
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
                if (filteringParams.Combinator == Combinator.AND)
                {
                    combinedExpression = Expression.AndAlso(combinedExpression, ruleExpression);
                }
                else if (filteringParams.Combinator == Combinator.OR)
                {
                    combinedExpression = Expression.OrElse(combinedExpression, ruleExpression);
                }
            }
        }

        if (combinedExpression == null)
        {
            throw new InvalidOperationException("No filtering parameters specified.");
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
            Operator.EQUAL => Expression.Equal(left, right),
            Operator.NOT_EQUAL => Expression.NotEqual(left, right),
            Operator.GREATER_THAN => Expression.GreaterThan(left, right),
            Operator.GREATER_THAN_OR_EQUAL => Expression.GreaterThanOrEqual(left, right),
            Operator.LESS_THAN => Expression.LessThan(left, right),
            Operator.LESS_THAN_OR_EQUAL => Expression.LessThanOrEqual(left, right),
            // Handle other operators as needed
            _ => throw new ArgumentException($"Unsupported operator: {op}"),
        };
}
