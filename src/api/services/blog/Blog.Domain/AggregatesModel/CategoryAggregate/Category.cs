using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Domain.AggregatesModel.AuditableAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

public class Category : FullAuditableAggregateRoot
{
    public Guid? ParentId { get; private set; }

    public string Name { get; private set; }
    public string Slug { get; private set; }
    public string? Description { get; private set; }

    public int Level { get; private set; } = 1;

    public virtual Category? Parent { get; private set; }

    private readonly List<Category> _children = new();
    public virtual IReadOnlyCollection<Category> Children => _children;

    private readonly List<Post> _posts = new();
    public virtual IReadOnlyCollection<Post> Posts => _posts;

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

    public void SetLevel(int level)
    {
        Level = level;
    }

    public void AddChildren(Category children)
    {
        children.SetLevel(Level + 1);

        _children.Add(children);
    }
}
