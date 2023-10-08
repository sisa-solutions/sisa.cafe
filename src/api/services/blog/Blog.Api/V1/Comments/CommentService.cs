using Google.Protobuf.WellKnownTypes;
using Grpc.Core;

using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Comments.Commands;
using Sisa.Blog.Api.V1.Comments.Queries;
using Sisa.Blog.Api.V1.Comments.Responses;
using Sisa.Blog.Api.V1.Comments;

namespace Sisa.Blog.Api.V1.Posts;

[GrpcService]
public sealed class CommentService(IMediator mediator) : CommentGrpcService.CommentGrpcServiceBase
{
    public override async Task<ListCommentsResponse> GetComments(GetCommentsQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SingleCommentResponse> FindCommentById(FindCommentByIdQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SingleCommentResponse> UpdateComment(UpdateCommentCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    public override async Task<Empty> DeleteComment(DeleteCommentCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    public override async Task<SingleCommentResponse> ReplyComment(ReplyCommentCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    #region Reactions

    public override async Task<Empty> React(ReactToCommentCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    #endregion
}
