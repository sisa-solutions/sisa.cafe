using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sisa.Data.EntityConfigurations;

using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Extensions;

namespace Sisa.Blog.Data.EntityConfigurations;

public class CategoryEntityConfiguration : EntityConfiguration<Category>
{
    public override void Configure(EntityTypeBuilder<Category> builder)
    {
        base.Configure(builder);

        builder.MapId();
        
        builder
            .HasIndex(p => p.Slug);
            // .IncludeProperties(p => p.Name);

        builder
            .Property(p => p.Name)
            .HasMaxLength(100)
            .IsRequired()
            .HasDefaultValueSql("''");

        builder
            .Property(p => p.Slug)
            .HasMaxLength(100)
            .IsRequired()
            .HasDefaultValueSql("''");

        builder
            .Property(p => p.Description)
            .HasMaxLength(200)
            .IsRequired()
            .HasDefaultValueSql("''");

        builder
            .Property(p => p.Level)
            .IsRequired()
            .HasDefaultValue(1);

        builder
            .HasOne(p => p.Parent)
            .WithMany(p => p.Children)
            .HasForeignKey(p => p.ParentId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
