using Microsoft.EntityFrameworkCore;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Data.Repositories;

namespace Sisa.Blog.Data.Repositories;

[TransientService]
public class TagRepository(BlogDbContext dbContext) : Repository<Tag>(dbContext), ITagRepository
{
}
