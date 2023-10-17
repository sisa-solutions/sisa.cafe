using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Domain.AggregatesModel.AuditableAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

public class Category : FullAuditableAggregateRoot
{
    public Guid? ParentId { get; private set; }

    public string Name { get; private set; }
    public string Slug { get; private set; }
    public string? Description { get; private set; }

    public Category? Parent { get; private set; }

    public int PostCount { get; private set; }

    private readonly List<Category> _children = [];
    public IReadOnlyCollection<Category> Children => _children;

    private readonly List<Post> _posts = [];
    public IReadOnlyCollection<Post> Posts => _posts;

    public Category(string name, string slug)
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

    public void SetParent(Category parent)
    {
        ParentId = parent.Id;
    }

    public void SetParent(Guid parentId)
    {
        ParentId = parentId;
    }

    public void RemoveParent()
    {
        ParentId = null;
    }

    public void IncreasePostCount()
    {
        PostCount++;
    }

    public void DecreasePostCount()
    {
        PostCount--;
    }

    public bool InUse()
    {
        return PostCount > 0;
    }
}
