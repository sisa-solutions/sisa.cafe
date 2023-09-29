﻿using System.Linq.Expressions;

namespace Sisa.Abstractions;

public interface IRepository<TEntity>
    where TEntity : class, IAggregateRoot
{
    IUnitOfWork UnitOfWork { get; }
    IQueryable<TEntity> Query { get; }

    ValueTask<TEntity?> FindAsync(object keyValue, CancellationToken cancellationToken = default);
    ValueTask<TEntity?> FindAsync(object[] keyValues, CancellationToken cancellationToken = default);
    ValueTask<TResult?> FindAsync<TResult>(
        Expression<Func<TEntity, bool>> predicate
        , Expression<Func<TEntity, TResult>> selector
        , CancellationToken cancellationToken = default);

    ValueTask<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default);
    ValueTask<IEnumerable<TResult>> GetAsync<TResult>(
        Expression<Func<TEntity, bool>> predicate
        , Expression<Func<TEntity, TResult>> selector
        , CancellationToken cancellationToken = default);

    ValueTask<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize, CancellationToken cancellationToken = default);
    ValueTask<IEnumerable<TResult>> GetAsync<TResult>(
        Expression<Func<TEntity, bool>> predicate
        , int pageIndex
        , int pageSize
        , Expression<Func<TEntity, TResult>> selector
        , CancellationToken cancellationToken = default);

    ValueTask<IPaginatedList<TEntity>> PaginateAsync(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize, CancellationToken cancellationToken = default);
    ValueTask<IPaginatedList<TResult>> PaginateAsync<TResult>(
        Expression<Func<TEntity, bool>> predicate
        , int pageIndex
        , int pageSize
        , Expression<Func<TEntity, TResult>> selector
        , CancellationToken cancellationToken = default);

    TEntity Add(TEntity entity);
    ValueTask<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken = default);

    void AddRange(IEnumerable<TEntity> entities);
    void AddRange(params TEntity[] entities);

    Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default);
    Task AddRangeAsync(params TEntity[] entities);

    TEntity Update(TEntity entity);
    void UpdateRange(IEnumerable<TEntity> entities);
    void UpdateRange(params TEntity[] entities);

    // void Remove(object keyValue);
    void Remove(TEntity entity);

    // void RemoveRange<TKey>(IEnumerable<TKey> keyValues);
    // void RemoveRange(params object[] keyValues);
    void RemoveRange(IEnumerable<TEntity> entities);
    void RemoveRange(params TEntity[] entities);

    ValueTask<bool> ExistAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default);
}
