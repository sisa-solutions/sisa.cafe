namespace Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;

public record ReactionCounter
{
    public ReactionType Type { get; init; }
    public int Count { get; private set; }

    public ReactionCounter(ReactionType type, int count)
    {
        Type = type;
        Count = count;
    }

    public void Increment()
    {
        Count++;
    }
}
