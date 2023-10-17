using Microsoft.EntityFrameworkCore;

using Sisa.Blog.Data.EntityConfigurations;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Data;
using Sisa.Extensions;

namespace Sisa.Blog.Data;

public class BlogDbContext(DbContextOptions<BlogDbContext> options) : BaseDbContext(options)
{
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Tag> Tags => Set<Tag>();

    public DbSet<Post> Posts => Set<Post>();
    public DbSet<PostTag> PostTags => Set<PostTag>();
    public DbSet<PostReaction> PostReactions => Set<PostReaction>();

    public DbSet<Comment> Comments => Set<Comment>();
    public DbSet<CommentReaction> CommentReactions => Set<CommentReaction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ConfigureExtensions();
        modelBuilder.UseCustomDbFunctions();
        modelBuilder.UseCustomPostgreSQLDbFunctions();

        modelBuilder.ApplyConfiguration(new CategoryEntityConfiguration());
        modelBuilder.ApplyConfiguration(new TagEntityConfiguration());

        modelBuilder.ApplyConfiguration(new PostEntityConfiguration());

        modelBuilder.ApplyConfiguration(new PostReactionEntityConfiguration());

        modelBuilder.ApplyConfiguration(new CommentEntityConfiguration());
        modelBuilder.ApplyConfiguration(new CommentReactionEntityConfiguration());

        modelBuilder.ApplySnakeCaseConventions();
    }
}
