using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Categories.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

namespace Sisa.Blog.Api.V1.Categories.Queries;

public sealed partial class FindCategoryByIdQuery : IQuery<SingleCategoryResponse>
{
    public Guid CategoryId
        => Guid.TryParse(Id, out var id) ? id : throw new Exception("Invalid id");
}

public class FindCategoryByIdQueryHandler(
    ICategoryRepository repository,
    ILogger<FindCategoryByIdQueryHandler> logger
) : IQueryHandler<FindCategoryByIdQuery, SingleCategoryResponse>
{
    public async ValueTask<SingleCategoryResponse> HandleAsync(FindCategoryByIdQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding category by id {Id}", query.Id);

        var category = await repository.FindAsync(
            x => x.Id == query.CategoryId
            , CategoryProjections.Projection
            , cancellationToken
        );

        if (category is null)
        {
            logger.LogError("Category with id {Id} not found", query.Id);

            throw new Exception("Category not found");
        }

        return category.ToSingleResponse();
    }
}
