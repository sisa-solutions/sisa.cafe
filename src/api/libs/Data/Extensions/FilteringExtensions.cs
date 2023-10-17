using System.Collections;
using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Enums;

namespace Sisa.Data;

public static partial class FilteringExtensions
{
    public static IQueryable<TEntity> Where<TEntity>(this IQueryable<TEntity> query, IFilteringParams filteringParams)
    {
        if (filteringParams == null || filteringParams.Rules == null || !filteringParams.Rules.Any())
        {
            return query;
        }

        var filterExpression = ParseFiltering<TEntity>(filteringParams);

        return query.Where(filterExpression);
    }

    private static Expression<Func<TEntity, bool>> ParseFiltering<TEntity>(IFilteringParams filteringParams)
    {
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
        var property = filterRule.Field.Contains('.')
            ? filterRule.Field
                .Split('.')
                .Aggregate((Expression)param, Expression.PropertyOrField)
            : Expression.PropertyOrField(param, filterRule.Field);

        var value = Expression.Constant(filterRule.Value);
        var operation = BuildOperationExpression(property, value, filterRule.Operator);

        if (filterRule.Not)
        {
            operation = Expression.Not(operation);
        }

        return operation;
    }

    private static Expression BuildOperationExpression(Expression left, Expression right, Operator op)
    {
        return op switch
        {
            // 1 equals
            Operator.Equal => Expression.Equal(left, right),

            // 2 not equals
            Operator.NotEqual => Expression.NotEqual(left, right),

            // 3 greater than
            Operator.GreaterThan => Expression.GreaterThan(left, right),

            // 4 greater than or equal
            Operator.GreaterThanOrEqual => Expression.GreaterThanOrEqual(left, right),

            // 5 less than
            Operator.LessThan => Expression.LessThan(left, right),

            // 6 less than or equal
            Operator.LessThanOrEqual => Expression.LessThanOrEqual(left, right),

            // 7 contains
            Operator.Contains => left.Type switch
            {
                var type when type.GetInterface(nameof(IEnumerable)) != null => Expression.Call(
                    typeof(Enumerable).GetMethods()
                        .First(m => m.Name == nameof(Enumerable.Contains) && m.GetParameters().Length == 2)
                        .MakeGenericMethod(typeof(string))
                    , left
                    , right
                ),
                _ => Expression.Call(left, left.Type.GetMethod("Contains", [left.Type])!, right),
            },

            // 8 not contains
            Operator.NotContains => left.Type switch
            {
                var type when type.GetInterface(nameof(IEnumerable)) != null => Expression.Not(Expression.Call(
                    typeof(Enumerable).GetMethods()
                        .First(m => m.Name == nameof(Enumerable.Contains) && m.GetParameters().Length == 2)
                        .MakeGenericMethod(typeof(string))
                    , left
                    , right)
                ),
                _ => Expression.Not(Expression.Call(left, left.Type.GetMethod("Contains", [left.Type])!, right)),
            },

            // 9 starts with
            Operator.StartsWith => Expression.Call(left, typeof(string).GetMethod("StartsWith", [typeof(string)])!, right),

            // 10 not starts with
            Operator.NotStartsWith => Expression.Not(Expression.Call(left, typeof(string).GetMethod("StartsWith", [typeof(string)])!, right)),

            // 11 ends with
            Operator.EndsWith => Expression.Call(left, typeof(string).GetMethod("EndsWith", [typeof(string)])!, right),

            // 12 not ends with
            Operator.NotEndsWith => Expression.Not(Expression.Call(left, typeof(string).GetMethod("EndsWith", [typeof(string)])!, right)),

            // 13 in
            Operator.In => Expression.Call(typeof(Enumerable), "Contains", [typeof(string)], right, left),

            // 14 not in
            Operator.NotIn => Expression.Not(Expression.Call(typeof(Enumerable), "Contains", [typeof(string)], right, left)),

            // 15 between
            Operator.Between => Expression.AndAlso(
                Expression.GreaterThanOrEqual(left, Expression.Property(right, "Start")),
                Expression.LessThanOrEqual(left, Expression.Property(right, "End"))),

            // 16 not between
            Operator.NotBetween => Expression.OrElse(
                Expression.LessThan(left, Expression.Property(right, "Start")),
                Expression.GreaterThan(left, Expression.Property(right, "End"))),

            // 17 is null
            Operator.IsNull => Expression.Equal(left, Expression.Constant(null)),

            // 18 is not null
            Operator.IsNotNull => Expression.NotEqual(left, Expression.Constant(null)),

            // Handle other operators as needed
            _ => throw new ArgumentException($"Unsupported operator: {op}"),
        };
    }
}
