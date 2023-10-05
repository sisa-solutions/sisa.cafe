export { CommentGrpcServiceClient } from './generated/sisa/services/blog/v1/comments/comment_grpc_service';

export {
  ReplyCommentCommand,
  DeleteCommentCommand,
  ReactToCommentCommand,
  UpdateCommentCommand,
} from './generated/sisa/services/blog/v1/comments/commands';

export {
  FindCommentByIdQuery,
  GetCommentsQuery,
} from './generated/sisa/services/blog/v1/comments/queries';

export type {
  CommentResponse,
  ListCommentsResponse,
  SingleCommentResponse,
} from './generated/sisa/services/blog/v1/comments/responses';

