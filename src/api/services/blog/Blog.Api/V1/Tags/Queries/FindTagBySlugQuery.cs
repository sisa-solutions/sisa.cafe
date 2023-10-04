using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Api.V1.Tags.Queries;

public sealed partial class FindTagBySlugQuery : IQuery<SingleTagResponse>
{
}

public sealed class FindTagBySlugQueryValidator : AbstractValidator<FindTagBySlugQuery>
{
    public FindTagBySlugQueryValidator()
    {
        RuleFor(x => x.Slug)
            .NotEmpty()
            .MaximumLength(50);
    }
}

public class FindTagBySlugQueryHandler(
    ITagRepository repository,
    ILogger<FindTagBySlugQueryHandler> logger
) : IQueryHandler<FindTagBySlugQuery, SingleTagResponse>
{
    public async ValueTask<SingleTagResponse> HandleAsync(FindTagBySlugQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding Tag by slug {Slug}", query.Slug);

        TagResponse? tag = await repository.FindAsync(
            x => x.Slug == query.Slug
            , TagProjections.Projection
            , cancellationToken);

        if (tag is null)
        {
            logger.LogError("Tag with slug {Slug} not found", query.Slug);

            throw new Exception("Tag not found");
        }

        return tag.MapToResponse();
    }
}
