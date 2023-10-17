using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;
using Sisa.Domain.AggregatesModel.AuditableAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.CommentAggregate;

public class Comment : FullAuditableAggregateRoot
{
    public Guid? ParentId { get; private set; }
    public Guid PostId { get; private set; }

    public string Content { get; private set; }

    public int Level { get; private set; }

    public int ViewCount { get; private set; }
    public int CommentCount { get; private set; }
    public int ReactionCount { get; private set; }

    private readonly List<ReactionCounter> _reactionCounts = [];
    public IReadOnlyCollection<ReactionCounter> ReactionCounts => _reactionCounts;

    public int Point { get; private set; }

    public Comment? Parent { get; private set; }

    private readonly List<Comment> _children = [];
    public IReadOnlyCollection<Comment> Children => _children;

    public Post Post { get; private set; } = null!;

    private readonly List<CommentReaction> _reactions = [];
    public IReadOnlyCollection<CommentReaction> Reactions => _reactions;

    public Comment(string content)
    {
        Content = content;
    }

    public Comment(Guid postId, string content) : this(content)
    {
        PostId = postId;
    }

    public Comment(Guid postId, string content, int level) : this(postId, content)
    {
        Level = level;
    }

    public void Update(string content)
    {
        Content = content;
    }

    public void Reply(string content)
    {
        var comment = new Comment(PostId, content, Level + 1);

        _children.Add(comment);

        Post.IncreaseCommentCount();
    }

    public void React(Guid userId, ReactionType reactionType)
    {
        var reaction = _reactions
            .FirstOrDefault(x => x.UserId == userId);

        if (reaction == null)
        {
            reaction = new CommentReaction(userId);

            reaction.AddReaction(reactionType);

            _reactions.Add(reaction);

            IncreaseReactionCount(reactionType);
        }
        else
        {
            var reactionItem = reaction.Reactions
                .FirstOrDefault(x => x.Type == reactionType);

            if (reactionItem == null)
            {
                reaction.AddReaction(reactionType);

                IncreaseReactionCount(reactionType);
            }
            else
            {
                reaction.RemoveReaction(reactionType);

                DecreaseReactionCount(reactionType);
            }
        }
    }

    public void RemoveReaction(Guid userId, ReactionType reactionType)
    {
        var userReaction = _reactions.FirstOrDefault(x => x.UserId == userId);

        userReaction?.RemoveReaction(reactionType);
    }

    private void IncreaseReactionCount(ReactionType reactionType)
    {
        ReactionCount++;

        var reactionCounter = _reactionCounts
            .FirstOrDefault(x => x.Type == reactionType);

        if (reactionCounter == null)
        {
            reactionCounter = new ReactionCounter(reactionType, 1);

            _reactionCounts.Add(reactionCounter);
        }
        else
        {
            reactionCounter.Increment();
        }
    }

    private void DecreaseReactionCount(ReactionType reactionType)
    {
        ReactionCount--;

        var reactionCounter = _reactionCounts
            .FirstOrDefault(x => x.Type == reactionType);

        if (reactionCounter == null)
        {
            throw new InvalidOperationException();
        }

        reactionCounter.Increment();
    }

    public void IncreaseViewCount()
    {
        ViewCount++;

        UpdatePoint();
    }

    public void IncreaseCommentCount()
    {
        CommentCount++;

        UpdatePoint();
    }

    public void DecreaseCommentCount()
    {
        CommentCount--;

        UpdatePoint();
    }


    /// <summary>
    /// Increase point of post
    /// </summary>
    /// <param name="point"></param>
    public void UpdatePoint()
    {
        var viewPoints = ViewCount * 1;
        var reactionPoints = ReactionCount * 2;
        var commentPoints = CommentCount * 3;

        Point = viewPoints + commentPoints + reactionPoints;
    }
}
