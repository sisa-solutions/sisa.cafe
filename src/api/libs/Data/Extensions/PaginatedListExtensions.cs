using Sisa.Abstractions;
using Sisa.Data;

namespace Sisa.Extensions;

public static class PaginatedListExtensions
{
    public static IPaginatedList<TSource> ToPaginatedList<TSource>(this IEnumerable<TSource> source, int page, int pageSize)
        => PaginatedList<TSource>.Create(source, page, pageSize);

    public static async Task<IPaginatedList<TSource>> ToPaginatedListAsync<TSource>(this IQueryable<TSource> source, int page, int pageSize, CancellationToken cancellationToken = default)
        => await PaginatedList<TSource>.CreateAsync(source, page, pageSize, cancellationToken);
}
