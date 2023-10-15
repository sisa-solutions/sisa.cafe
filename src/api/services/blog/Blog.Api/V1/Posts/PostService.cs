using Google.Protobuf.WellKnownTypes;
using Grpc.Core;

using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Posts.Commands;
using Sisa.Blog.Api.V1.Posts.Queries;
using Sisa.Blog.Api.V1.Posts.Responses;

using Sisa.Blog.Api.V1.Comments.Commands;
using Sisa.Blog.Api.V1.Comments.Queries;
using Sisa.Blog.Api.V1.Comments.Responses;

namespace Sisa.Blog.Api.V1.Posts;

[GrpcService]
public sealed class PostService(IMediator mediator) : PostGrpcService.PostGrpcServiceBase
{
    public override async Task<ListPostsResponse> GetPosts(GetPostsQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SinglePostResponse> FindPostById(FindPostByIdQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SinglePostResponse> CreatePost(CreatePostCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    public override async Task<SinglePostResponse> UpdatePost(UpdatePostCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    public override async Task<Empty> PublishPost(PublishPostCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    public override async Task<Empty> DeletePost(DeletePostCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    #region Published Posts

    public override async Task<ListPostsResponse> GetPublishedPosts(GetPublishedPostsQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SinglePostResponse> FindPublishedPostBySlug(FindPublishedPostBySlugQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    #endregion

    #region Comments

    public override async Task<ListCommentsResponse> GetCommentsByPostId(GetCommentsByPostIdQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SingleCommentResponse> CreateComment(CreateCommentCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    #endregion

    #region Reactions

    public override async Task<Empty> React(ReactToPostCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    #endregion
}
