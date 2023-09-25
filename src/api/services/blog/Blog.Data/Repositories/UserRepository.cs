using Sisa.Abstractions;
using Sisa.Data.Repositories;
using Sisa.Blog.Domain.AggregatesModel.UserAggregate;

namespace Sisa.Blog.Data.Repositories;

[TransientService]
public class UserRepository(BlogDbContext dbContext) : Repository<User>(dbContext), IUserRepository
{
}
