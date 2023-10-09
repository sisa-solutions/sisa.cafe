using System.Linq.Expressions;

using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Common.Responses;

using File = Sisa.Blog.Domain.AggregatesModel.FileAggregate.File;

namespace Sisa.Blog.Api.V1.Files.Responses;

public static partial class FileProjections
{
    public static SingleFileResponse ToSingleResponse(this File file)
    {
        return new SingleFileResponse()
        {
            Value = file.ToResponse()
        };
    }

    public static SingleFileResponse ToSingleResponse(this FileResponse file)
    {
        return new SingleFileResponse()
        {
            Value = file
        };
    }

    public static ListFilesResponse ToListResponse(this IPaginatedList<FileResponse> files)
    {
        var response = new ListFilesResponse()
        {
            Value = { files },
            Paging = new PagingInfoResponse
            {
                ItemCount = files.ItemCount,
                PageIndex = files.PageIndex,
                PageSize = files.PageSize,
                PageCount = files.PageCount
            }
        };

        return response;
    }

    public static FileResponse ToResponse(this File file)
    {
        return Projection.Compile().Invoke(file);
    }

    public static Expression<Func<File, FileResponse>> Projection
    {
        get
        {
            return x => new FileResponse
            {
                Id = x.Id.ToString(),
                // originalName = x.OriginalName,
                Bucket = x.Bucket,
                Path = x.Path,
                Name = x.Name,
                Title = x.Title,
                Description = x.Description,
                // Url = x.Url,
                // Tags = {
                //     x.Tags
                // },
                Creator = new ActorInfoResponse()
                {
                    Id = x.CreatedBy.ToString(),
                    DisplayName = "Administrator",
                    Timestamp = x.CreatedAt.ToTimestamp()
                },
                Updater = x.UpdatedBy != null ? new ActorInfoResponse()
                {
                    Id = x.UpdatedBy.Value.ToString(),
                    DisplayName = "Administrator",
                    Timestamp = x.UpdatedAt!.Value.ToTimestamp()
                } : null,
            };
        }
    }
}
