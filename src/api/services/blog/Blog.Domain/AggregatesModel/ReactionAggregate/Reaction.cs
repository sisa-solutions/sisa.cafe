namespace Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;

public class Reaction
{
    public ReactionType Type { get; set; }
    public DateTimeOffset ReactedAt { get; set; }
}