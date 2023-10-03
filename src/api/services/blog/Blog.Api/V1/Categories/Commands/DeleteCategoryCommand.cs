using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

namespace Sisa.Blog.Api.V1.Categories.Commands;

public sealed partial class DeleteCategoryCommand : ICommand<Empty>
{
    public Guid CategoryId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;
}

public class DeleteCategoryCommandHandler(
    ICategoryRepository repository,
    ILogger<DeleteCategoryCommandHandler> logger
) : ICommandHandler<DeleteCategoryCommand, Empty>
{
    public async ValueTask<Empty> HandleAsync(DeleteCategoryCommand command, CancellationToken cancellationToken = default)
    {
        Category? category = await repository
            .FindAsync(command.CategoryId, cancellationToken);

        if (category is null)
        {
            logger.LogWarning("Category with id {id} not found", command.CategoryId);

            throw new Exception($"Category with id {command.Id} not found");
        }

        repository.Remove(category);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
