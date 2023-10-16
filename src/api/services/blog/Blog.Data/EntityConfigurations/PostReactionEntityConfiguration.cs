using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sisa.Data.EntityConfigurations;

using Sisa.Extensions;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;

namespace Sisa.Blog.Data.EntityConfigurations;

public class PostReactionEntityConfiguration : EntityConfiguration<PostReaction>
{
    public override void Configure(EntityTypeBuilder<PostReaction> builder)
    {
        base.Configure(builder);

        builder.MapId();

        builder.Property(p => p.Reactions)
            .HasColumnType("jsonb")
            .HasDefaultValueSql("'[]'");

        builder
            .HasOne(p => p.Post)
            .WithMany(p => p.Reactions)
            .HasForeignKey(p => p.PostId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
