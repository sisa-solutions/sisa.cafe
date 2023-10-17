using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

using Sisa.Extensions;
using Sisa.Blog.Data;

namespace Sisa.Blog.DbMigrator;

public class BlogDbContextFactory : IDesignTimeDbContextFactory<BlogDbContext>
{
    public BlogDbContext CreateDbContext(string[] args)
    {
        DbContextOptionsBuilder<BlogDbContext> optionsBuilder = new();

        optionsBuilder.UseMigrationDatabase<BlogDbContextFactory>(nameof(BlogDbContext));

        return new BlogDbContext(optionsBuilder.Options);
    }

    /*
     * cd db-migrators/Blog.DbMigrator
     * dotnet ef migrations add Initialize -c Sisa.Blog.Data.BlogDbContext -o PostgreSQL/Migrations
     *
     * dotnet ef migrations script -i -c Sisa.Blog.Data.BlogDbContext -o PostgreSQL/Scripts/000_Snapshot.sql
     *
     * dotnet ef migrations script -i -c Sisa.Blog.Data.BlogDbContext 0 Initialize -o PostgreSQL/Scripts/010_Initialize.sql
     */
}
