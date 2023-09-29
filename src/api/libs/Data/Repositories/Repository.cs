﻿using System.Linq.Expressions;

using Microsoft.EntityFrameworkCore;

using Sisa.Abstractions;

namespace Sisa.Data.Repositories;

public abstract class Repository<TDbContext, TEntity> : IRepository<TEntity>
    where TEntity : class, IAggregateRoot
    where TDbContext : DbContext, IUnitOfWork
{
    private readonly TDbContext _dbContext;
    protected readonly DbSet<TEntity> _dbSet;

    protected Repository(TDbContext dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _dbSet = dbContext.Set<TEntity>();
    }

    public IQueryable<TEntity> Query => _dbSet;

    public IUnitOfWork UnitOfWork => _dbContext;

    public async ValueTask<TEntity?> FindAsync(object keyValue, CancellationToken cancellationToken = default)
        // Work around solution
        // see https://github.com/aspnet/EntityFrameworkCore/issues/12012
        // see https://github.com/dotnet/efcore/issues/22667
        => await _dbSet.FindAsync(new[] { keyValue }, cancellationToken);

    public async ValueTask<TEntity?> FindAsync(object[] keyValues, CancellationToken cancellationToken = default)
        => await _dbSet.FindAsync(keyValues, cancellationToken);

    public async ValueTask<TResult?> FindAsync<TResult>(
        Expression<Func<TEntity, bool>> predicate
        , Expression<Func<TEntity, TResult>> selector
        , CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(predicate)
            .Select(selector)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public TEntity Add(TEntity entity)
        => _dbSet.Add(entity).Entity;

    public async ValueTask<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        var entityEntry = await _dbSet.AddAsync(entity, cancellationToken);

        return entityEntry.Entity;
    }

    public async ValueTask<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(predicate)
            .ToListAsync(cancellationToken);
    }

    public async ValueTask<IEnumerable<TResult>> GetAsync<TResult>(
        Expression<Func<TEntity, bool>> predicate
        , Expression<Func<TEntity, TResult>> selector
        , CancellationToken cancellationToken = default)
    {
        return await  _dbSet
            .Where(predicate)
            .Select(selector)
            .ToListAsync(cancellationToken);
    }

    public async ValueTask<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(predicate)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }

    public async ValueTask<IEnumerable<TResult>> GetAsync<TResult>(
        Expression<Func<TEntity, bool>> predicate
        , int pageIndex
        , int pageSize
        , Expression<Func<TEntity, TResult>> selector
        , CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(predicate)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .Select(selector)
            .ToListAsync(cancellationToken);
    }

    public async ValueTask<IPaginatedList<TEntity>> PaginateAsync(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize, CancellationToken cancellationToken = default)
    {
        var count = await _dbSet.CountAsync(predicate, cancellationToken);

        var items = await _dbSet
            .Where(predicate)
            .Skip(pageIndex * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new PaginatedList<TEntity>(items, count, pageIndex, pageSize);
    }

    public async ValueTask<IPaginatedList<TResult>> PaginateAsync<TResult>(
        Expression<Func<TEntity, bool>> predicate
        , int pageIndex
        , int pageSize
        , Expression<Func<TEntity, TResult>> selector
        , CancellationToken cancellationToken = default)
    {
        var count = await _dbSet.CountAsync(predicate, cancellationToken);

        var items = await _dbSet
            .Where(predicate)
            .Skip(pageIndex * pageSize)
            .Take(pageSize)
            .Select(selector)
            .ToListAsync(cancellationToken);

        return new PaginatedList<TResult>(items, count, pageIndex, pageSize);
    }

    public void AddRange(IEnumerable<TEntity> entities)
        => _dbSet.AddRange(entities);

    public void AddRange(params TEntity[] entities)
        => _dbSet.AddRange(entities);

    public async Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default)
        => await _dbSet.AddRangeAsync(entities, cancellationToken);

    public async Task AddRangeAsync(params TEntity[] entities)
        => await _dbSet.AddRangeAsync(entities, default);

    public TEntity Update(TEntity entity)
    {
        _dbContext.Entry(entity).State = EntityState.Modified;

        return entity;
    }

    public void UpdateRange(IEnumerable<TEntity> entities)
    {
        foreach (var entity in entities)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
    }

    public void UpdateRange(params TEntity[] entities)
    {
        foreach (var entity in entities)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
    }

    // public void Remove(object keyValue)
    // {
    //     object entity = Activator.CreateInstance(typeof(TEntity), keyValue) ?? throw new NullReferenceException(nameof(entity));

    //     _dbContext.Remove(entity);
    // }

    // public void RemoveRange<TKey>(IEnumerable<TKey> keyValues)
    // {
    //     IEnumerable<object> entities = keyValues.Select(t =>
    //         Activator.CreateInstance(typeof(TEntity), t) ?? throw new NullReferenceException("entity"));

    //     _dbContext.RemoveRange(entities);
    // }

    // public void RemoveRange(params object[] keyValues)
    // {
    //     IEnumerable<object> entities = keyValues.Select(t =>
    //         Activator.CreateInstance(typeof(TEntity), t) ?? throw new NullReferenceException("entity"));

    //     _dbContext.RemoveRange(entities);
    // }

    public void Remove(TEntity entity)
        => _dbSet.Remove(entity);

    public void RemoveRange(IEnumerable<TEntity> entities)
        => _dbSet.RemoveRange(entities);

    public void RemoveRange(params TEntity[] entities)
        => _dbSet.RemoveRange(entities);

    public async ValueTask<bool> ExistAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default)
        => await _dbSet.AnyAsync(predicate, cancellationToken);
}

public abstract class Repository<TEntity> : Repository<BaseDbContext, TEntity>
    where TEntity : class, IAggregateRoot
{
    protected Repository(BaseDbContext dbContext) : base(dbContext)
    {
    }
}
