using Sisa.Domain.AggregatesModel.AuditableAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.TagAggregate;

public class Tag : FullAuditableAggregateRoot
{
    public string Name { get; private set; }
    public string Slug { get; private set; }
    public string? Description { get; private set; }

    public Tag(string name, string slug)
    {
        Name = name;
        Slug = slug;
    }

    public void Update(string name, string slug)
    {
        Name = name;
        Slug = slug;
    }

    public void Describe(string? description)
    {
        Description = description;
    }
}
