using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Files.Responses;
using Sisa.Blog.Domain.AggregatesModel.FileAggregate;
using Sisa.Blog.Domain.Specifications;

namespace Sisa.Blog.Api.V1.Files.Queries;

public sealed partial class GetFilesQuery : IQuery<ListFilesResponse>
{
}

public class GetFilesQueryHandler(
    IFileRepository repository,
    ILogger<GetFilesQueryHandler> logger
) : IQueryHandler<GetFilesQuery, ListFilesResponse>
{
    public async ValueTask<ListFilesResponse> HandleAsync(GetFilesQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Getting categories");

        var spec = new FileSpecification<FileResponse>(
            query.Filter,
            query.SortBy,
            query.Paging,
            FileProjections.Projection);

        var files = await repository
            .PaginateAsync(spec, cancellationToken);

        return files.ToListResponse();
    }
}
