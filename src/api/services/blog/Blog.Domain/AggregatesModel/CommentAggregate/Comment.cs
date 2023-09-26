using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;
using Sisa.Domain.AggregatesModel.AuditableAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.CommentAggregate;

public class Comment : FullAuditableAggregateRoot
{
    public Guid? ParentId { get; private set; }
    public Guid PostId { get; private set; }

    public string Content { get; private set; }

    public virtual Comment? Parent { get; private set; }

    private readonly List<Comment> _children = [];
    public virtual IReadOnlyCollection<Comment> Children => _children;

    public virtual Post Post { get; private set; } = null!;

    private readonly List<CommentReaction> _reactions = [];
    public virtual IReadOnlyCollection<CommentReaction> Reactions => _reactions;

    public Comment(string content)
    {
        Content = content;
    }

    public Comment(Guid postId, string content)
    {
        PostId = postId;
        Content = content;
    }

    public void Update(string content)
    {
        Content = content;
    }

    public void AddComment(string content)
    {
        var comment = new Comment(PostId, content);

        _children.Add(comment);
    }

    public void RemoveComment(Comment comment)
    {
        _children.Remove(comment);
    }

    public void AddReaction(Guid userId, ReactionType reactionType)
    {
        var userReaction = _reactions.FirstOrDefault(x => x.UserId == userId);

        if (userReaction is not null)
        {
            userReaction.AddReaction(reactionType);
        }
        else
        {
            var reaction = new CommentReaction(userId);

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
