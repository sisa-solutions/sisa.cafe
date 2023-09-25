using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sisa.Data.EntityConfigurations;

using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;
using Sisa.Extensions;

namespace Sisa.Blog.Data.EntityConfigurations;

public class CommentEntityConfiguration : EntityConfiguration<Comment>
{
    public override void Configure(EntityTypeBuilder<Comment> builder)
    {
        base.Configure(builder);

        builder.MapId();
        
        builder
            .Property(p => p.Content)
            .HasMaxLength(500)
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

        builder
            .HasOne(p => p.Post)
            .WithMany(p => p.Comments)
            .HasForeignKey(p => p.PostId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
