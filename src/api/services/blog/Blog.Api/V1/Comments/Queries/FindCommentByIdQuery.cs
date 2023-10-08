using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Api.V1.Comments.Responses;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;

namespace Sisa.Blog.Api.V1.Comments.Queries;

public sealed partial class FindCommentByIdQuery : IQuery<SingleCommentResponse>
{
    public Guid ParsedId => Guid.TryParse(Id, out var id) ? id : Guid.Empty;
}

public sealed class FindCommentByIdQueryValidator : AbstractValidator<FindCommentByIdQuery>
{
    public FindCommentByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
                .WithMessage("Invalid Id");
    }
}

public class FindCommentByIdQueryHandler(
    ICommentRepository repository,
    ILogger<FindCommentByIdQueryHandler> logger
) : IQueryHandler<FindCommentByIdQuery, SingleCommentResponse>
{
    public async ValueTask<SingleCommentResponse> HandleAsync(FindCommentByIdQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding comment by id {Id}", query.Id);

        var comment = await repository.FindAsync(
            x => x.Id == query.ParsedId
            , CommentProjections.Projection
            , cancellationToken);

        if (comment is null)
        {
            logger.LogError("Comment with id {Id} not found", query.Id);

            throw new Exception("Comment not found");
        }

        return comment.MapToResponse();
    }
}
