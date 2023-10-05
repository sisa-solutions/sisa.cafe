/* eslint-disable */

export const protobufPackage = "sisa.blog.api.v1.posts.requests";

export enum PostStatus {
  POST_STATUS_DRAFT = 0,
  POST_STATUS_PUBLISHED = 1,
  POST_STATUS_ARCHIVED = 2,
  UNRECOGNIZED = -1,
}

export function postStatusFromJSON(object: any): PostStatus {
  switch (object) {
    case 0:
    case "POST_STATUS_DRAFT":
      return PostStatus.POST_STATUS_DRAFT;
    case 1:
    case "POST_STATUS_PUBLISHED":
      return PostStatus.POST_STATUS_PUBLISHED;
    case 2:
    case "POST_STATUS_ARCHIVED":
      return PostStatus.POST_STATUS_ARCHIVED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PostStatus.UNRECOGNIZED;
  }
}

export function postStatusToJSON(object: PostStatus): string {
  switch (object) {
    case PostStatus.POST_STATUS_DRAFT:
      return "POST_STATUS_DRAFT";
    case PostStatus.POST_STATUS_PUBLISHED:
      return "POST_STATUS_PUBLISHED";
    case PostStatus.POST_STATUS_ARCHIVED:
      return "POST_STATUS_ARCHIVED";
    case PostStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
