using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;
using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;
using Sisa.Domain.AggregatesModel.AuditableAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.PostAggregate;

public class Post : FullAuditableAggregateRoot
{
    public Guid CategoryId { get; private set; }

    public string Title { get; private set; }
    public string Slug { get; private set; }
    public string Excerpt { get; private set; }
    public string Content { get; set; }

    public PostStatus Status { get; private set; } = PostStatus.DRAFT;

    private readonly List<PostStatusHistory> _statusHistories = new();
    public IReadOnlyCollection<PostStatusHistory> StatusHistories => _statusHistories;

    private readonly List<string> _tags = new();
    public virtual IReadOnlyCollection<string> Tags => _tags;

    public virtual Category Category { get; private set; } = null!;

    private readonly List<Comment> _comments = new();
    public virtual IReadOnlyCollection<Comment> Comments => _comments;

    private readonly List<PostReaction> _reactions = new();
    public virtual IReadOnlyCollection<PostReaction> Reactions => _reactions;

    public Post(Guid categoryId, string title, string slug, string excerpt, string content)
    {
        CategoryId = categoryId;
        Title = title;
        Slug = slug;
        Excerpt = excerpt;
        Content = content;
    }

    public void Update(string title, string slug, string excerpt, string content)
    {
        Title = title;
        Slug = slug;
        Excerpt = excerpt;
        Content = content;
    }

    public void AddComment(string content)
    {
        var comment = new Comment(content);

        _comments.Add(comment);
    }

    public void RemoveComment(Comment comment)
    {
        _comments.Remove(comment);
    }

    public void ChangeCategory(Guid categoryId)
    {
        CategoryId = categoryId;
    }

    public void AddTag(string tag)
    {
        _tags.Add(tag);
    }

    public void RemoveTag(string tag)
    {
        _tags.Remove(tag);
    }

    #region Status

    public PostStatus[] NextAllowedStatuses()
    {
        return Status switch
        {
            PostStatus.DRAFT => new[] { PostStatus.PUBLISHED },
            PostStatus.PUBLISHED => new[] { PostStatus.ARCHIVED, PostStatus.DRAFT },
            PostStatus.ARCHIVED => new[] { PostStatus.PUBLISHED },
            _ => throw new ArgumentOutOfRangeException()
        };
    }

    private void ChangeStatus(PostStatus status, string? remarks)
    {
        if (!NextAllowedStatuses().Contains(status))
        {
            throw new InvalidOperationException($"Cannot change status from {Status} to {status}");
        }

        Status = status;

        _statusHistories.Add(new PostStatusHistory(status, DateTimeOffset.UtcNow, remarks));
    }

    public void Publish(string? remarks)
    {
        ChangeStatus(PostStatus.PUBLISHED, remarks);
    }

    public void Archive(string? remarks)
    {
        ChangeStatus(PostStatus.ARCHIVED, remarks);
    }

    public void Unarchive(string? remarks)
    {
        ChangeStatus(PostStatus.PUBLISHED, remarks);
    }

    public void Draft(string? remarks)
    {
        ChangeStatus(PostStatus.DRAFT, remarks);
    }

    #endregion

    public void AddReaction(Guid userId, ReactionType reactionType)
    {
        var userReaction = _reactions.FirstOrDefault(x => x.UserId == userId);

        if (userReaction is not null)
        {
            userReaction.AddReaction(reactionType);
        }
        else
        {
            var reaction = new PostReaction(userId);

            reaction.AddReaction(reactionType);

            _reactions.Add(reaction);
        }
    }

    public void RemoveReaction(Guid userId, ReactionType reactionType)
    {
        var userReaction = _reactions.FirstOrDefault(x => x.UserId == userId);

        userReaction?.RemoveReaction(reactionType);
    }
}
