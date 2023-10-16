using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sisa.Data.EntityConfigurations;

using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Extensions;

namespace Sisa.Blog.Data.EntityConfigurations;

public class TagEntityConfiguration : EntityConfiguration<Tag>
{
    public override void Configure(EntityTypeBuilder<Tag> builder)
    {
        base.Configure(builder);

        builder.MapId();

        builder
            .HasIndex(p => p.Slug)
            .IncludeProperties(p => p.Name);

        builder
            .Property(p => p.Name)
            .HasMaxLength(50)
            .IsRequired()
            .HasDefaultValueSql("''");

        builder
            .Property(p => p.Slug)
            .HasMaxLength(50)
            .IsRequired()
            .HasDefaultValueSql("''");

        builder
            .Property(p => p.Description)
            .HasMaxLength(200)
            .IsRequired()
            .HasDefaultValueSql("''");
    }
}
