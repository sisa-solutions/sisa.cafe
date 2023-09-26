using Google.Protobuf.WellKnownTypes;

using Sisa.Abstractions;

using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;

namespace Sisa.Blog.Api.V1.Categories.Commands;

public sealed partial class DeleteCategoryCommand : ICommand<Empty>
{
}

public class DeleteCategoryCommandHandler(
    ICategoryRepository repository,
    ILogger<DeleteCategoryCommandHandler> logger
) : ICommandHandler<DeleteCategoryCommand, Empty>
{
    public async ValueTask<Empty> HandleAsync(DeleteCategoryCommand command, CancellationToken cancellationToken = default)
    {
        Category? category = await repository
            .FindAsync(Guid.Parse(command.Id), cancellationToken);

        if (category is null)
        {
            logger.LogWarning("Category with id {id} not found", command.Id);

            throw new Exception($"Category with id {command.Id} not found");
        }

        repository.Remove(category);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return new Empty();
    }
}
