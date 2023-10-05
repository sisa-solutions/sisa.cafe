using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.PostAggregate;

public class PostReaction : Entity
{
    public Guid PostId { get; private set; }
    public Guid UserId { get; private set; }

    private readonly List<Reaction> _reactions = [];
    public IReadOnlyCollection<Reaction> Reactions => _reactions;

    public Post Post { get; private set; } = null!;

    public PostReaction(Guid userId)
    {
        UserId = userId;
    }

    public PostReaction(Guid userId, ReactionType type) : this(userId)
    {
        AddReaction(type);
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