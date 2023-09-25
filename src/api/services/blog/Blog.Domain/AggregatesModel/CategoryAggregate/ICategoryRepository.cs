using Sisa.Abstractions;

namespace Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

public interface ICategoryRepository : IRepository<Category>
{
    Task<bool> ExistAsync(string slug, CancellationToken cancellationToken = default);
    Task<bool> ExistAsync(Guid id, string slug, CancellationToken cancellationToken = default);
}
