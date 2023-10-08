export {
  UpdateCommentCommand,
  DeleteCommentCommand,
} from '../generated/sisa/services/blog/v1/comments/commands';

export {
  FindCommentByIdQuery,
  GetCommentsQuery,
} from '../generated/sisa/services/blog/v1/comments/queries';

export {
  CommentResponse,
  ListCommentsResponse,
} from '../generated/sisa/services/blog/v1/comments/responses';

export * from './comment-api';
