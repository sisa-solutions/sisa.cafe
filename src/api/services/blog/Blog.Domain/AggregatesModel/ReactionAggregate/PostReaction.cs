using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;

public class PostReaction : AggregateRoot
{
    public Guid PostId { get; private set; }
    public Guid UserId { get; private set; }

    private readonly List<Reaction> _reactions = [];
    public IReadOnlyCollection<Reaction> Reactions => _reactions;

    public virtual Post Post { get; private set; } = null!;

    public PostReaction(Guid userId)
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