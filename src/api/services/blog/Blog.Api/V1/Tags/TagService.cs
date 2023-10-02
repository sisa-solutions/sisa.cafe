using Google.Protobuf.WellKnownTypes;
using Grpc.Core;

using Sisa.Abstractions;
using Sisa.Extensions;

using Sisa.Blog.Api.V1.Tags.Commands;
using Sisa.Blog.Api.V1.Tags.Queries;
using Sisa.Blog.Api.V1.Tags.Responses;

namespace Sisa.Blog.Api.V1.Tags;

[GrpcService]
public sealed class TagService(IMediator mediator) : TagGrpcService.TagGrpcServiceBase
{
    public override async Task<ListTagsResponse> GetTags(GetTagsQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SingleTagResponse> FindTagById(FindTagByIdQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SingleTagResponse> FindTagBySlug(FindTagBySlugQuery query, ServerCallContext context)
        => await mediator.SendAsync(query, context.CancellationToken);

    public override async Task<SingleTagResponse> CreateTag(CreateTagCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    public override async Task<SingleTagResponse> UpdateTag(UpdateTagCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);

    public override async Task<Empty> DeleteTag(DeleteTagCommand command, ServerCallContext context)
        => await mediator.SendAsync(command, context.CancellationToken);
}
