using Sisa.Abstractions;
using Sisa.Data;

namespace Sisa.Extensions;

public static class PaginatedListExtensions
{
    public static IPaginatedList<TSource> ToPaginatedList<TSource>(this IEnumerable<TSource> source, int pageIndex, int pageSize)
        => PaginatedList<TSource>.Create(source, pageIndex, pageSize);

    public static async ValueTask<IPaginatedList<TSource>> ToPaginatedListAsync<TSource>(this IQueryable<TSource> source, int pageIndex, int pageSize, CancellationToken cancellationToken = default)
        => await PaginatedList<TSource>.CreateAsync(source, pageIndex, pageSize, cancellationToken);
}
