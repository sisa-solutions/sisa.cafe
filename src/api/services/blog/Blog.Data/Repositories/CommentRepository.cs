using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;
using Sisa.Data.Repositories;

namespace Sisa.Blog.Data.Repositories;

[TransientService]
public class CommentRepository(BlogDbContext dbContext)
    : Repository<Comment>(dbContext), ICommentRepository
{
}