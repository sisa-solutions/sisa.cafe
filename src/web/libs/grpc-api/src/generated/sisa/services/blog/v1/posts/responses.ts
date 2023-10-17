/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ActorInfoResponse } from "../../../../libs/common/responses/actor_info_response";
import { PagingInfoResponse } from "../../../../libs/common/responses/paging_info_response";
import { CategoryInfoResponse } from "../categories/responses";
import { PostStatus } from "./enums";

export interface PostResponse {
  /** data fields: from 1 to 50 */
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tagSlugs: string[];
  viewCount: number;
  commentCount: number;
  reactionCount: number;
  reactionCounts: { [key: string]: number };
  status: PostStatus;
  /** relationship fields: from 51 to 60 */
  category:
    | CategoryInfoResponse
    | undefined;
  /** audit fields: from 63 to 70 */
  creator: ActorInfoResponse | undefined;
  updater: ActorInfoResponse | undefined;
}

export interface PostResponse_ReactionCountsEntry {
  key: string;
  value: number;
}

export interface SinglePostResponse {
  value: PostResponse | undefined;
}

export interface ListPostsResponse {
  value: PostResponse[];
  paging: PagingInfoResponse | undefined;
}

function createBasePostResponse(): PostResponse {
  return {
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tagSlugs: [],
    viewCount: 0,
    commentCount: 0,
    reactionCount: 0,
    reactionCounts: {},
    status: 0,
    category: undefined,
    creator: undefined,
    updater: undefined,
  };
}

export const PostResponse = {
  encode(message: PostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.slug !== "") {
      writer.uint32(26).string(message.slug);
    }
    if (message.excerpt !== "") {
      writer.uint32(34).string(message.excerpt);
    }
    if (message.content !== "") {
      writer.uint32(42).string(message.content);
    }
    for (const v of message.tagSlugs) {
      writer.uint32(50).string(v!);
    }
    if (message.viewCount !== 0) {
      writer.uint32(56).int32(message.viewCount);
    }
    if (message.commentCount !== 0) {
      writer.uint32(64).int32(message.commentCount);
    }
    if (message.reactionCount !== 0) {
      writer.uint32(72).int32(message.reactionCount);
    }
    Object.entries(message.reactionCounts).forEach(([key, value]) => {
      PostResponse_ReactionCountsEntry.encode({ key: key as any, value }, writer.uint32(82).fork()).ldelim();
    });
    if (message.status !== 0) {
      writer.uint32(88).int32(message.status);
    }
    if (message.category !== undefined) {
      CategoryInfoResponse.encode(message.category, writer.uint32(410).fork()).ldelim();
    }
    if (message.creator !== undefined) {
      ActorInfoResponse.encode(message.creator, writer.uint32(490).fork()).ldelim();
    }
    if (message.updater !== undefined) {
      ActorInfoResponse.encode(message.updater, writer.uint32(498).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PostResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePostResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.excerpt = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.content = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.tagSlugs.push(reader.string());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.viewCount = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.commentCount = reader.int32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.reactionCount = reader.int32();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          const entry10 = PostResponse_ReactionCountsEntry.decode(reader, reader.uint32());
          if (entry10.value !== undefined) {
            message.reactionCounts[entry10.key] = entry10.value;
          }
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 51:
          if (tag !== 410) {
            break;
          }

          message.category = CategoryInfoResponse.decode(reader, reader.uint32());
          continue;
        case 61:
          if (tag !== 490) {
            break;
          }

          message.creator = ActorInfoResponse.decode(reader, reader.uint32());
          continue;
        case 62:
          if (tag !== 498) {
            break;
          }

          message.updater = ActorInfoResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
};

function createBasePostResponse_ReactionCountsEntry(): PostResponse_ReactionCountsEntry {
  return { key: "", value: 0 };
}

export const PostResponse_ReactionCountsEntry = {
  encode(message: PostResponse_ReactionCountsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PostResponse_ReactionCountsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePostResponse_ReactionCountsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
};

function createBaseSinglePostResponse(): SinglePostResponse {
  return { value: undefined };
}

export const SinglePostResponse = {
  encode(message: SinglePostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      PostResponse.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SinglePostResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSinglePostResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = PostResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
};

function createBaseListPostsResponse(): ListPostsResponse {
  return { value: [], paging: undefined };
}

export const ListPostsResponse = {
  encode(message: ListPostsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.value) {
      PostResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingInfoResponse.encode(message.paging, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListPostsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPostsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value.push(PostResponse.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.paging = PagingInfoResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
};
