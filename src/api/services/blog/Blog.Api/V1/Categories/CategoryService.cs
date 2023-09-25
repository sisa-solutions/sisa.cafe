using Google.Protobuf.WellKnownTypes;
using Grpc.Core;

using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Categories.Commands;
using Sisa.Blog.Api.V1.Categories.Queries;
using Sisa.Blog.Api.V1.Categories.Responses;

namespace Sisa.Blog.Api.V1.Categories;

[GrpcService]
public sealed class CategoryService(IMediator mediator) : CategoryGrpcService.CategoryGrpcServiceBase
{
    public override async Task<ListCategoriesResponse> GetCategories(GetCategoriesQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SingleCategoryResponse> FindCategoryById(FindCategoryByIdQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SingleCategoryResponse> CreateCategory(CreateCategoryCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    public override async Task<SingleCategoryResponse> UpdateCategory(UpdateCategoryCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    public override async Task<Empty> DeleteCategory(DeleteCategoryCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);
}
