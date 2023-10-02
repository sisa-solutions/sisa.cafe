using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Enums;

namespace Sisa.Extensions;

public static partial class SortingExtensions
{
    public static Expression<Func<TEntity, object>> GetOrderBy<TEntity>(this IEnumerable<ISortingParams> sortingParams)
    {
        ParameterExpression param = Expression.Parameter(typeof(TEntity), "x");
        Expression? orderByProperty = null;

        foreach (var sortingParam in sortingParams)
        {
            var property = typeof(TEntity).GetProperty(sortingParam.Field)
                ?? throw new ArgumentException($"Property {sortingParam.Field} not found in type {typeof(TEntity).Name}");

            var propertyAccess = Expression.MakeMemberAccess(param, property);

            Expression<Func<TEntity, object>> orderByExpression = x => propertyAccess;

            if (sortingParam.Direction == SortDirection.DESC)
            {
                orderByExpression = x => Expression.Convert(propertyAccess, typeof(object));
            }

            orderByProperty = orderByProperty == null
                ? orderByExpression.Body
                : Expression.Call(
                    typeof(Queryable),
                    sortingParam.Direction == SortDirection.ASC ? "ThenBy" : "ThenByDescending",
                    [typeof(TEntity), property.PropertyType],
                    orderByProperty,
                    orderByExpression.Body);
        }

        return orderByProperty == null
            ? throw new InvalidOperationException("No sorting parameters specified.")
            : Expression.Lambda<Func<TEntity, object>>(orderByProperty, param);
    }
}
