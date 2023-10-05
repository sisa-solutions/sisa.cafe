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
    public override async Task<SingleCommentResponse> ReplyComment(ReplyCommentCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    #region Reactions

    public override async Task<Empty> React(ReactToCommentCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    #endregion
}
