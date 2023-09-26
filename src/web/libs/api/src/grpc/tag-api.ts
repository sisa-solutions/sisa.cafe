export { TagGrpcServiceClient } from './generated/sisa/services/blog/v1/tags/tag_grpc_service';

export {
  CreateTagCommand,
  DeleteTagCommand,
  UpdateTagCommand,
} from './generated/sisa/services/blog/v1/tags/commands';

export {
  FilterTagsQuery,
  FindTagByIdQuery,
  GetTagsQuery,
} from './generated/sisa/services/blog/v1/tags/queries';

export type {
  TagResponse,
  SingleTagResponse,
  ListTagsResponse,
} from './generated/sisa/services/blog/v1/tags/responses';
