using Microsoft.EntityFrameworkCore;

using Sisa.Abstractions;
using Sisa.Data.Repositories;
using Sisa.Blog.Domain.AggregatesModel.FileAggregate;

using File = Sisa.Blog.Domain.AggregatesModel.FileAggregate.File;

namespace Sisa.Blog.Data.Repositories;

[TransientService]
public class FileRepository(BlogDbContext dbContext) : Repository<File>(dbContext), IFileRepository
{
}
