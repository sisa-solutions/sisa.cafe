using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Data.Repositories;

namespace Sisa.Blog.Data.Repositories;

[TransientService]
public class CategoryRepository(BlogDbContext dbContext) : Repository<Category>(dbContext), ICategoryRepository
{
    public async Task<bool> ExistAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await ExistAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<bool> ExistAsync(string slug, CancellationToken cancellationToken = default)
    {
        return await ExistAsync(x => x.Slug == slug, cancellationToken);
    }

    public async Task<bool> ExistAsync(Guid id, string slug, CancellationToken cancellationToken = default)
    {
        return await ExistAsync(x => x.Id != id && x.Slug == slug, cancellationToken);
    }
}
