using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Data.Repositories;

namespace Sisa.Blog.Data.Repositories;

[TransientService]
public class CategoryRepository(BlogDbContext dbContext) : Repository<Category>(dbContext), ICategoryRepository
{
}
