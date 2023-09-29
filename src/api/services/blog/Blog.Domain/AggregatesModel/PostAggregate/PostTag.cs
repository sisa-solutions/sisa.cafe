using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.PostAggregate;

public class PostTag : BaseEntity
{
    public Guid PostId { get; init; }
    public Guid TagId { get; init; }

    public Post Post { get; } = null!;
    public Tag Tag { get; } = null!;

    public PostTag()
    {
    }

    public PostTag(Guid postId, Guid tagId)
    {
        PostId = postId;
        TagId = tagId;
    }
}
