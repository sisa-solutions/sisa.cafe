using System.Data;

using Microsoft.EntityFrameworkCore;

using Sisa.Abstractions;

namespace Sisa.Extensions;

public static class DbContextExtensions
{
    public static async Task DispatchDomainEventsAsync(this IEventPublisher publisher, DbContext dbContext)
    {
        var domainEntities = dbContext.ChangeTracker
            .Entries<Entity>()
            .Where(x => x.Entity.DomainEvents != null && x.Entity.DomainEvents.Any());

        var domainEvents = domainEntities
            .SelectMany(x => x.Entity.DomainEvents)
            .ToList();

        domainEntities.ToList()
            .ForEach(entity => entity.Entity.ClearDomainEvents());

        foreach (var domainEvent in domainEvents)
            await publisher.PublishAsync(domainEvent);
    }
}
