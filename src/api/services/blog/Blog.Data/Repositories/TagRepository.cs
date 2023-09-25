using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Data.Repositories;

namespace Sisa.Blog.Data.Repositories;

[TransientService]
public class TagRepository(BlogDbContext dbContext) : Repository<Tag>(dbContext), ITagRepository
{
    public async Task<bool> ExistAsync(string slug, CancellationToken cancellationToken = default)
    {
        return await ExistAsync(x => x.Slug == slug, cancellationToken);
    }

    public async Task<bool> ExistAsync(Guid id, string slug, CancellationToken cancellationToken = default)
    {
        return await ExistAsync(x => x.Id != id && x.Slug == slug, cancellationToken);
    }
}
