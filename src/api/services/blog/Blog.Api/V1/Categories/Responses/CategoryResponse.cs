using System.Linq.Expressions;

using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Common.Responses;

namespace Sisa.Blog.Api.V1.Categories.Responses;

public static partial class CategoryProjections
{
    public static SingleCategoryResponse ToSingleResponse(this Category category)
    {
        return new SingleCategoryResponse()
        {
            Value = category.ToResponse()
        };
    }

    public static SingleCategoryResponse ToSingleResponse(this CategoryResponse category)
    {
        return new SingleCategoryResponse()
        {
            Value = category
        };
    }

    public static ListCategoriesResponse ToListResponse(this IPaginatedList<CategoryResponse> categories)
    {
        var response = new ListCategoriesResponse()
        {
            Value = { categories },
            Paging = new PagingInfoResponse
            {
                ItemCount = categories.ItemCount,
                PageIndex = categories.PageIndex,
                PageSize = categories.PageSize,
                PageCount = categories.PageCount
            }
        };

        return response;
    }

    public static CategoryResponse ToResponse(this Category category)
    {
        return Projection.Compile().Invoke(category);
    }

    public static Expression<Func<Category, CategoryResponse>> Projection
    {
        get
        {
            return x => new CategoryResponse
            {
                Id = x.Id.ToString(),
                Slug = x.Slug,
                Name = x.Name,
                Description = x.Description,
                PostCount = x.PostCount,

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
                Parent = x.Parent == null ? null : new CategoryInfoResponse
                {
                    Id = x.Parent.Id.ToString(),
                    Name = x.Parent.Name,
                    Slug = x.Parent.Slug,
                    Description = x.Parent.Description
                }
            };
        }
    }
}
