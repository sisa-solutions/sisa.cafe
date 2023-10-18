using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Constants;
using Sisa.Enums;

namespace Sisa.Extensions;

public static partial class OrderExtensions
{
    public static IQueryable<TEntity> OrderBy<TEntity>(this IQueryable<TEntity> query, IEnumerable<ISortingParams> sortingParams)
        where TEntity : class
    {
        Type entityType = typeof(TEntity);
        ParameterExpression parameter = Expression.Parameter(entityType, "x");
        Expression expression = query.Expression;

        bool first = true;

        foreach (var sortingParam in sortingParams)
        {
            var orderByMethod = sortingParam.Sort == SortDirection.DESC ?
                (first ? OrderByMethods.OrderByDescending : OrderByMethods.ThenByDescending) :
                (first ? OrderByMethods.OrderBy : OrderByMethods.ThenBy);

            first = false;

            var property = entityType.GetProperty(sortingParam.Field);

            if (property == null)
                throw new ArgumentException($"Property {sortingParam.Field} not found in type {entityType.Name}");

            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);

            expression = Expression.Call(
                typeof(Queryable),
                orderByMethod,
                [entityType, property.PropertyType],
                expression,
                Expression.Quote(orderByExpression));
        }

        return query.Provider.CreateQuery<TEntity>(expression);
    }
}
