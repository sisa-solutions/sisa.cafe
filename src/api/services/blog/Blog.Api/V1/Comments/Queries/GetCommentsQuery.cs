using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Api.V1.Posts.Responses;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.Specifications;
using Sisa.Blog.Api.V1.Comments.Responses;
using FluentValidation;
using Sisa.Blog.Domain.AggregatesModel.CommentAggregate;
using Sisa.Data.Params;

namespace Sisa.Blog.Api.V1.Comments.Queries;

public sealed partial class GetCommentsQuery : IQuery<ListCommentsResponse>
{
}

public sealed class GetCommentsQueryValidator : AbstractValidator<GetCommentsQuery>
{
    public GetCommentsQueryValidator()
    {
    }
}

public class GetCommentsQueryHandler(
    ICommentRepository repository,
    ILogger<GetCommentsQueryHandler> logger
) : IQueryHandler<GetCommentsQuery, ListCommentsResponse>
{
    public async ValueTask<ListCommentsResponse> HandleAsync(GetCommentsQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Getting Comments");

        var spec = new CommentSpecification<CommentResponse>(
            query.Filter,
            query.SortBy,
            query.Paging,
            CommentProjections.Projection);

        var comments = await repository
            .PaginateAsync(spec, cancellationToken);

        return comments.MapToResponse();
    }
}
