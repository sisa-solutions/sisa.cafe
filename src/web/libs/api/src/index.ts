export * from './grpc/common';

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

// export * from './grpc/post-api';
// export * from './grpc/comment-api';
