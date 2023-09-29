using System.Linq.Expressions;

namespace Sisa.Abstractions;

public interface ISpecificationBuilder<TEntity>
    where TEntity : class
{
    SpecificationBuilder<TEntity> Include(Expression<Func<TEntity, object?>> includeExpression);
    SpecificationBuilder<TEntity> Include(string includeString);

    SpecificationBuilder<TEntity> Where(Expression<Func<TEntity, bool>> criteria);

    SpecificationBuilder<TEntity> Like(Expression<Func<TEntity, string>> likeExpression, string value);
    SpecificationBuilder<TEntity> StartWith(Expression<Func<TEntity, string>> likeExpression, string value);
    SpecificationBuilder<TEntity> EndWith(Expression<Func<TEntity, string>> likeExpression, string value);

    SpecificationBuilder<TEntity> OrderBy(Expression<Func<TEntity, object>> orderByExpression);
    SpecificationBuilder<TEntity> OrderByDescending(Expression<Func<TEntity, object>> orderByDescendingExpression);
    SpecificationBuilder<TEntity> GroupBy(Expression<Func<TEntity, object>> groupByExpression);

    SpecificationBuilder<TEntity> And(ISpecification<TEntity> specification);
    SpecificationBuilder<TEntity> Or(ISpecification<TEntity> specification);

    SpecificationBuilder<TEntity> AsNoTracking();
    SpecificationBuilder<TEntity> AsSplitQuery();
    SpecificationBuilder<TEntity> TagWith(string tag);
}
