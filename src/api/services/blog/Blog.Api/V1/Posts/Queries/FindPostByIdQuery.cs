using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Api.V1.Posts.Responses;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;

namespace Sisa.Blog.Api.V1.Posts.Queries;

public sealed partial class FindPostByIdQuery : IQuery<SinglePostResponse>
{
    public Guid ParsedId => Guid.TryParse(Id, out var id) ? id : Guid.Empty;
}

public sealed class FindPostByIdQueryValidator : AbstractValidator<FindPostByIdQuery>
{
    public FindPostByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
                .WithMessage("Invalid Id");
    }
}

public class FindPostByIdQueryHandler(
    IPostRepository repository,
    ILogger<FindPostByIdQueryHandler> logger
) : IQueryHandler<FindPostByIdQuery, SinglePostResponse>
{
    public async ValueTask<SinglePostResponse> HandleAsync(FindPostByIdQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding Post by id {Id}", query.Id);

        var post = await repository.FindAsync(
            x => x.Id == query.ParsedId
            , PostProjections.Projection
            , cancellationToken);

        if (post is null)
        {
            logger.LogError("Post with id {Id} not found", query.Id);

            throw new Exception("Post not found");
        }

        return post.MapToResponse();
    }
}
