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

    public static ListCategoriesResponse MapToResponse(this IPaginatedList<CategoryResponse> categories)
    {
        var paging = new PagingResponse
        {
            Count = categories.Count,
            Page = categories.Page,
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

    private static Expression<Func<Category, CategoryResponse>> Projection
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
            };
        }
    }
}
