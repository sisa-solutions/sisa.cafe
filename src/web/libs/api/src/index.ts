export * from './grpc/common';
export * from './grpc/helpers';

/* BEGIN: CATEGORIES */

export {
  CategoryResponse,
  CategoryInfoResponse,
  SingleCategoryResponse,
} from './grpc/generated/sisa/services/blog/v1/categories/responses';
export {
  CreateCategoryCommand,
  UpdateCategoryCommand,
} from './grpc/generated/sisa/services/blog/v1/categories/commands';

/* END: CATEGORIES */

/* BEGIN: TAGS */
export * from './grpc/category-api';

export {
  CreateTagCommand,
  UpdateTagCommand,
} from './grpc/generated/sisa/services/blog/v1/tags/commands';

export { TagResponse } from './grpc/generated/sisa/services/blog/v1/tags/responses';

export * from './grpc/tag-api';

/* END: TAGS */

/* BEGIN: POSTS */

export {
  CreatePostCommand,
  UpdatePostCommand,
  DeletePostCommand,
} from './grpc/generated/sisa/services/blog/v1/posts/commands';

export {
  FindPostByIdQuery,
  GetPostsQuery,
} from './grpc/generated/sisa/services/blog/v1/posts/queries';

export {
  ListPostsResponse,
  PostResponse,
} from './grpc/generated/sisa/services/blog/v1/posts/responses';

export * from './grpc/post-api';

/* END: POSTS */

// export * from './grpc/comment-api';
