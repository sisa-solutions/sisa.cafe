using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sisa.Data.EntityConfigurations;

using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;
using Sisa.Extensions;

namespace Sisa.Blog.Data.EntityConfigurations;

public class CommentReactionEntityConfiguration : EntityConfiguration<CommentReaction>
{
    public override void Configure(EntityTypeBuilder<CommentReaction> builder)
    {
        base.Configure(builder);

        builder.MapId();

        builder.Property(p => p.Reactions)
            .HasColumnType("jsonb")
            .HasDefaultValueSql("'[]'");

        builder
            .HasOne(p => p.Comment)
            .WithMany(p => p.Reactions)
            .HasForeignKey(p => p.CommentId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
