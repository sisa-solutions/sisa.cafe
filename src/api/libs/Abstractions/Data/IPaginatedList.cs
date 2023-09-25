namespace Sisa.Abstractions;

public interface IPaginatedList
{
    long Count { get; }
    int Page { get; }
    int PageSize { get; }
    int PageCount { get; }
}

public interface IPaginatedList<out TSource> : IPaginatedList, IReadOnlyList<TSource>
{
    new long Count { get; }
    string ToJsonInfo();
}
