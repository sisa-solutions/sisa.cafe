namespace Sisa.Blog.Domain.AggregatesModel.PostAggregate;

public class PostStatusHistory
{
    public PostStatus Status { get; private set; }
    public DateTimeOffset UpdatedAt { get; private set; }
    public string? Remarks { get; private set; }

    public PostStatusHistory(PostStatus status, DateTimeOffset updatedAt, string? remarks)
    {
        Status = status;
        UpdatedAt = updatedAt;
        Remarks = remarks;
    }
}