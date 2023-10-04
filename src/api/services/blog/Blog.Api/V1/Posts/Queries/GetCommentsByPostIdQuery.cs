using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Api.V1.Posts.Responses;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.Specifications;
using Sisa.Blog.Api.V1.Comments.Responses;
using FluentValidation;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;
using Sisa.Data.Params;

namespace Sisa.Blog.Api.V1.Posts.Queries;

public sealed partial class GetCommentsByPostIdQuery : IQuery<ListCommentsResponse>
{
    public Guid ParsedPostId => Guid.TryParse(PostId, out Guid id) ? id : Guid.Empty;
}

public sealed class GetCommentsByPostIdQueryValidator : AbstractValidator<GetCommentsByPostIdQuery>
{
    public GetCommentsByPostIdQueryValidator()
    {
        RuleFor(x => x.PostId)
            .NotEmpty()
            .Must((x, _) => x.ParsedPostId != Guid.Empty)
                .WithMessage("Invalid Post Id");
    }
}

public class GetCommentsByPostIdQueryHandler(
    IPostRepository postRepository,
    ICommentRepository commentRepository,
    ILogger<GetCommentsByPostIdQueryHandler> logger
) : IQueryHandler<GetCommentsByPostIdQuery, ListCommentsResponse>
{
    public async ValueTask<ListCommentsResponse> HandleAsync(GetCommentsByPostIdQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Getting Comments");

        var isPostExisting = await postRepository.ExistAsync(x => x.Id == query.ParsedPostId, cancellationToken);

        if (!isPostExisting)
        {
            logger.LogWarning("Post with id {id} not found", query.PostId);

            throw new Exception($"Post with id {query.PostId} not found");
        }

        var spec = new CommentSpecification<CommentResponse>(
            query.ParsedPostId,
            query.Paging,
            CommentProjections.Projection);

        var comments = await commentRepository
            .PaginateAsync(spec, cancellationToken);

        return comments.MapToResponse();
    }
}
