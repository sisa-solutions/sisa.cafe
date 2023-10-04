using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Api.V1.Tags.Queries;

public sealed partial class FindTagByIdQuery : IQuery<SingleTagResponse>
{
    public Guid TagId => Guid.TryParse(Id, out var id) ? id : Guid.Empty;
}

public sealed class FindTagByIdQueryValidator : AbstractValidator<FindTagByIdQuery>
{
    public FindTagByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((x, _) => x.TagId != Guid.Empty)
                .WithMessage("Invalid Id");
    }
}

public class FindTagByIdQueryHandler(
    ITagRepository repository,
    ILogger<FindTagByIdQueryHandler> logger
) : IQueryHandler<FindTagByIdQuery, SingleTagResponse>
{
    public async ValueTask<SingleTagResponse> HandleAsync(FindTagByIdQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding Tag by id {Id}", query.Id);

        TagResponse? tag = await repository.FindAsync(
            x=> x.Id == query.TagId
            , TagProjections.Projection
            , cancellationToken);

        if (tag is null)
        {
            logger.LogError("Tag with id {Id} not found", query.Id);

            throw new Exception("Tag not found");
        }

        return tag.MapToResponse();
    }
}
