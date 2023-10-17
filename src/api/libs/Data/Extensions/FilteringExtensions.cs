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

        Expression value;

        if (property.Type != typeof(string))
        {
            if (property.Type == typeof(Guid))
            {
                if (!Guid.TryParse(filterRule.Value, out Guid guidValue))
                {
                    throw new ArgumentException($"Invalid Guid value: {filterRule.Value}");
                }

                value = Expression.Constant(guidValue);
            }
            else if(property.Type.BaseType == typeof(Enum))
            {
                if (!Enum.TryParse(property.Type, filterRule.Value, out var enumValue))
                {
                    throw new ArgumentException($"Invalid Enum value: {filterRule.Value}");
                }

                value = Expression.Constant(enumValue);
            }
            else
            {
                // TODO: Correct Type conversion
                value = Expression.Constant(filterRule.Value);
            }
        }
        else
        {
            value = Expression.Constant(filterRule.Value);
        }

        var operation = BuildOperationExpression(property, value, filterRule.Operator);

        if (filterRule.Not)
        {
            operation = Expression.Not(operation);
        }

        return operation;
    }

    private static Expression BuildOperationExpression(Expression property, Expression value, Operator op)
    {
        return op switch
        {
            // 1 equals
            Operator.Equal => Expression.Equal(property, value),

            // 2 not equals
            Operator.NotEqual => Expression.NotEqual(property, value),

            // 3 greater than
            Operator.GreaterThan => Expression.GreaterThan(property, value),

            // 4 greater than or equal
            Operator.GreaterThanOrEqual => Expression.GreaterThanOrEqual(property, value),

            // 5 less than
            Operator.LessThan => Expression.LessThan(property, value),

            // 6 less than or equal
            Operator.LessThanOrEqual => Expression.LessThanOrEqual(property, value),

            // 7 contains
            Operator.Contains => property.Type switch
            {
                var type when type.Name != nameof(String) && type.GetInterface(nameof(IEnumerable)) != null
                    => Expression.Call(
                        typeof(Enumerable).GetMethods()
                            .First(m => m.Name == nameof(Enumerable.Contains) && m.GetParameters().Length == 2)
                            .MakeGenericMethod(typeof(string))
                        , property
                        , value
                    ),
                _ => Expression.Call(property, property.Type.GetMethod(nameof(Enumerable.Contains), [property.Type])!, value),
            },

            // 8 not contains
            Operator.NotContains => property.Type switch
            {
                var type when type.Name != nameof(String) && type.GetInterface(nameof(IEnumerable)) != null
                    => Expression.Not(Expression.Call(
                        typeof(Enumerable).GetMethods()
                            .First(m => m.Name == nameof(Enumerable.Contains) && m.GetParameters().Length == 2)
                            .MakeGenericMethod(typeof(string))
                        , property
                        , value)
                    ),
                _ => Expression.Not(Expression.Call(property, property.Type.GetMethod(nameof(Enumerable.Contains), [property.Type])!, value)),
            },

            // 9 starts with
            Operator.StartsWith => Expression.Call(property, typeof(string).GetMethod(nameof(string.StartsWith), [typeof(string)])!, value),

            // 10 not starts with
            Operator.NotStartsWith => Expression.Not(Expression.Call(property, typeof(string).GetMethod(nameof(string.StartsWith), [typeof(string)])!, value)),

            // 11 ends with
            Operator.EndsWith => Expression.Call(property, typeof(string).GetMethod(nameof(string.EndsWith), [typeof(string)])!, value),

            // 12 not ends with
            Operator.NotEndsWith => Expression.Not(Expression.Call(property, typeof(string).GetMethod(nameof(string.EndsWith), [typeof(string)])!, value)),

            // 13 in
            Operator.In => Expression.Call(typeof(Enumerable), nameof(Enumerable.Contains), [typeof(string)], value, property),

            // 14 not in
            Operator.NotIn => Expression.Not(Expression.Call(typeof(Enumerable), nameof(Enumerable.Contains), [typeof(string)], value, property)),

            // 15 between
            Operator.Between => Expression.AndAlso(
                Expression.GreaterThanOrEqual(property, Expression.Property(value, "Start")),
                Expression.LessThanOrEqual(property, Expression.Property(value, "End"))),

            // 16 not between
            Operator.NotBetween => Expression.OrElse(
                Expression.LessThan(property, Expression.Property(value, "Start")),
                Expression.GreaterThan(property, Expression.Property(value, "End"))),

            // 17 is null
            Operator.IsNull => Expression.Equal(property, Expression.Constant(null)),

            // 18 is not null
            Operator.IsNotNull => Expression.NotEqual(property, Expression.Constant(null)),

            // Handle other operators as needed
            _ => throw new ArgumentException($"Unsupported operator: {op}"),
        };
    }
}
