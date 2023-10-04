using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;
using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Domain.AggregatesModel.AuditableAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.PostAggregate;

public class Post : FullAuditableAggregateRoot
{
    public Guid CategoryId { get; private set; }

    public string Title { get; private set; }
    public string Slug { get; private set; }
    public string Excerpt { get; private set; }
    public string Content { get; private set; }

    public PostStatus Status { get; private set; } = PostStatus.DRAFT;

    private readonly List<PostStatusHistory> _statusHistories = [];
    public IReadOnlyCollection<PostStatusHistory> StatusHistories => _statusHistories;

    private readonly List<Tag> _tags = [];
    public IReadOnlyCollection<Tag> Tags => _tags;

    private readonly List<PostTag> _postTags = [];
    public IReadOnlyCollection<PostTag> PostTags => _postTags;

    public readonly List<string> _tagSlugs = [];
    public IReadOnlyCollection<string> TagSlugs => _tagSlugs;

    public Category Category { get; private set; } = null!;

    private readonly List<Comment> _comments = [];
    public IReadOnlyCollection<Comment> Comments => _comments;

    private readonly List<PostReaction> _reactions = [];
    public IReadOnlyCollection<PostReaction> Reactions => _reactions;

    public Post(string title, string slug, string excerpt, string content)
    {
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

    #region Status

    public void AddTags(IEnumerable<Tag> requestTags)
    {
        _tags.AddRange(requestTags);

        SyncTagSlugs();
    }

    public void UpdateTags(IEnumerable<Tag> requestTags)
    {
        _tags.Clear();
        _tags.AddRange(requestTags);

        SyncTagSlugs();
    }

    private void SyncTagSlugs()
    {
        _tagSlugs.Clear();
        _tagSlugs.AddRange(_tags.Select(x => x.Slug));
    }

    public PostStatus[] NextAllowedStatuses()
    {
        return Status switch
        {
            PostStatus.DRAFT => [PostStatus.PUBLISHED],
            PostStatus.PUBLISHED => [PostStatus.ARCHIVED, PostStatus.DRAFT],
            PostStatus.ARCHIVED => [PostStatus.PUBLISHED],
            _ => throw new ArgumentOutOfRangeException()
        };
    }

    private bool TryChangeStatus(PostStatus status, string? remarks)
    {
        if (!NextAllowedStatuses().Contains(status))
        {
            return false;
        }

        Status = status;

        _statusHistories.Add(new PostStatusHistory(status, DateTimeOffset.UtcNow, remarks));

        return true;
    }

    public bool IsCommentAble()
        => Status == PostStatus.PUBLISHED;

    public bool TryPublish(string? remarks)
        => TryChangeStatus(PostStatus.PUBLISHED, remarks);

    public void TryArchive(string? remarks)
        => TryChangeStatus(PostStatus.ARCHIVED, remarks);

    public void TryUnarchive(string? remarks)
        => TryChangeStatus(PostStatus.PUBLISHED, remarks);

    public void TryDraft(string? remarks)
        => TryChangeStatus(PostStatus.DRAFT, remarks);

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

    public void AssociateCategory(Category category)
    {
        Category = category;
    }
}
