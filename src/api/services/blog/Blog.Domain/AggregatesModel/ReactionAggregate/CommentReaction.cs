using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;

public class CommentReaction : AggregateRoot
{
    public Guid CommentId { get; private set; }
    public Guid UserId { get; private set; }

    private readonly List<Reaction> _reactions = new();
    public IReadOnlyCollection<Reaction> Reactions => _reactions;

    public virtual Comment Comment { get; private set; } = null!;

    public CommentReaction(Guid userId)
    {
        UserId = userId;
    }

    public void AddReaction(ReactionType type)
    {
        var reaction = new Reaction
        {
            Type = type,
            ReactedAt = DateTimeOffset.UtcNow
        };

        _reactions.Add(reaction);
    }

    public void RemoveReaction(ReactionType type)
    {
        var reaction = _reactions.FirstOrDefault(x => x.Type == type);

        if (reaction is not null)
        {
            _reactions.Remove(reaction);
        }
    }
}