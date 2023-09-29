using System.Linq.Expressions;

using Sisa.Abstractions;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Grpc.Responses;

namespace Sisa.Blog.Api.V1.Categories.Responses;

public static class CategoryProjectionExtensions
{
    public static SingleCategoryResponse MapToResponse(this Category category)
    {
        return new SingleCategoryResponse()
        {
            Value = Projection.Compile().Invoke(category)
        };
    }

    public static SingleCategoryResponse MapToResponse(this CategoryResponse category)
    {
        return new SingleCategoryResponse()
        {
            Value = category
        };
    }

    public static CategoryInfoResponse MapToInfoResponse(this Category category)
    {
        return new CategoryInfoResponse
        {
            Id = category.Id.ToString(),
            Name = category.Name,
            Slug = category.Slug,
            Description = category.Description
        };
    }

    public static ListCategoriesResponse MapToResponse(this IPaginatedList<CategoryResponse> categories)
    {
        var paging = new PagingResponse
        {
            Count = categories.ItemCount,
            Page = categories.PageIndex,
            PageSize = categories.PageSize,
            PageCount = categories.PageCount
        };

        var response = new ListCategoriesResponse()
        {
            Paging = paging
        };

        response.Value.AddRange(categories);

        return response;
    }

    public static IQueryable<CategoryResponse> ProjectToResponse(this IQueryable<Category> categories)
    {
        return categories.Select(Projection);
    }

    public static Expression<Func<Category, CategoryResponse>> Projection
    {
        get
        {
            return x => new CategoryResponse
            {
                Id = x.Id.ToString(),
                ParentId = x.ParentId.HasValue ? x.ParentId.Value.ToString() : null,
                Slug = x.Slug,
                Name = x.Name,
                Description = x.Description,
                Parent = x.Parent != null ? x.Parent.MapToInfoResponse() : null,
            };
        }
    }
}
