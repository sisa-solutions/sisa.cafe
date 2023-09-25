using Microsoft.EntityFrameworkCore;

using Sisa.Abstractions;

namespace Sisa.Data;

public class PaginatedList<TSource> : List<TSource>, IPaginatedList<TSource>
{
    public new long Count { get; private set; }

    public int Page { get; private set; }

    public int PageSize { get; private set; }

    public int PageCount { get; private set; }

    // public bool HasPreviousPage => Page > 1;

    // public bool HasNextPage => Page < PageCount;

    public PaginatedList(IEnumerable<TSource> items, long count, int page, int pageSize)
    {
        Page = page;
        PageSize = pageSize;

        Count = count;

        PageCount = (int)Math.Ceiling(count / (double)pageSize);

        AddRange(items);
    }

    public static IPaginatedList<TSource> Create(IEnumerable<TSource> source, int page, int pageSize)
    {
        var count = source.LongCount();

        if (pageSize < 1)
        {
            return new PaginatedList<TSource>(source, count, page, 0);
        }

        var items = source.Skip((page - 1) * pageSize).Take(pageSize);

        return new PaginatedList<TSource>(items, count, page, pageSize);
    }

    public static async Task<IPaginatedList<TSource>> CreateAsync(IQueryable<TSource> source, int page, int pageSize, CancellationToken cancellationToken = default)
    {
        var count = await source.LongCountAsync(cancellationToken);

        if (pageSize < 1)
        {
            return new PaginatedList<TSource>(source, count, page, 0);
        }

        var items = await source.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(cancellationToken);

        return new PaginatedList<TSource>(items, count, page, pageSize);
    }

    private IPaginatedList GetPaginatedList() => this;

    public string ToJsonInfo() =>  "{}"; //JsonSerializer.Serialize(GetPaginatedList(), JsonConstants.JSON_SERIALIZER_OPTIONS);
}
