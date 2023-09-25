using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Sisa.Blog.Data;

public class BlogDbContextFactory(
    IDbContextFactory<BlogDbContext> pooledFactory,
    ILogger<BlogDbContext> logger
) : IDbContextFactory<BlogDbContext>
{
    public BlogDbContext CreateDbContext()
    {
        var context = pooledFactory.CreateDbContext();

        context.ConfigureLogger(logger);

        return context;
    }
}
