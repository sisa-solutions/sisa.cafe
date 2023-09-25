using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sisa.Data.EntityConfigurations;

using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Extensions;

namespace Sisa.Blog.Data.EntityConfigurations;

public class PostEntityConfiguration : EntityConfiguration<Post>
{
    public override void Configure(EntityTypeBuilder<Post> builder)
    {
        base.Configure(builder);

        builder.MapId();
        
        builder
            .HasIndex(p => p.Slug);
            // .IncludeProperties(p => p.Title);

        builder
            .Property(p => p.Title)
            .HasMaxLength(100)
            .IsRequired()
            .HasDefaultValueSql("''");

        builder
            .Property(p => p.Slug)
            .HasMaxLength(100)
            .IsRequired()
            .HasDefaultValueSql("''");

        builder
            .Property(p => p.Excerpt)
            .HasMaxLength(200)
            .IsRequired()
            .HasDefaultValueSql("''");

        builder
            .Property(p => p.Content)
            .HasMaxLength(5000)
            .IsRequired()
            .HasDefaultValueSql("''");

        builder
            .Property(p => p.Status)
            .HasConversion<string>()
            .HasMaxLength(50)
            .IsRequired()
            .HasDefaultValueSql($"'{PostStatus.DRAFT}'");
        
        builder.Property(p => p.Tags)
            .HasColumnType("jsonb")
            .HasDefaultValueSql("'[]'");

        builder.Property(p => p.StatusHistories)
            .HasColumnType("jsonb")
            .HasDefaultValueSql("'[]'");

        builder
            .HasOne(p => p.Category)
            .WithMany(p => p.Posts)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
