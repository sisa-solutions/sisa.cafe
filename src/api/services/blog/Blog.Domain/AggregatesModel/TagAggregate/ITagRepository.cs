using Sisa.Abstractions;

namespace Sisa.Blog.Domain.AggregatesModel.TagAggregate;

public interface ITagRepository : IRepository<Tag>
{
    Task<bool> ExistAsync(string slug, CancellationToken cancellationToken = default);
    Task<bool> ExistAsync(Guid id, string slug, CancellationToken cancellationToken = default);
}
