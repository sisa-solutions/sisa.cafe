using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Data.Repositories;

namespace Sisa.Blog.Data.Repositories;

[TransientService]
public class PostRepository(BlogDbContext dbContext) : Repository<Post>(dbContext), IPostRepository
{
}