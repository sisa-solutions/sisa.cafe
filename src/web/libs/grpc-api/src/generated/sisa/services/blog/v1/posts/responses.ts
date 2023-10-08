/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ActorInfoResponse } from "../../../../libs/common/responses/actor_info_response";
import { PagingInfoResponse } from "../../../../libs/common/responses/paging_info_response";
import { CategoryInfoResponse } from "../categories/responses";

export const protobufPackage = "sisa.blog.api.v1.posts.responses";

export interface PostResponse {
  /** data fields: from 1 to 50 */
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  viewCount: number;
  commentCount: number;
  reactionCount: number;
  reactionCounts: { [key: string]: number };
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
    tags: [],
    viewCount: 0,
    commentCount: 0,
    reactionCount: 0,
    reactionCounts: {},
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
    for (const v of message.tags) {
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

          message.tags.push(reader.string());
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

  fromJSON(object: any): PostResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      excerpt: isSet(object.excerpt) ? globalThis.String(object.excerpt) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      tags: globalThis.Array.isArray(object?.tags) ? object.tags.map((e: any) => globalThis.String(e)) : [],
      viewCount: isSet(object.viewCount) ? globalThis.Number(object.viewCount) : 0,
      commentCount: isSet(object.commentCount) ? globalThis.Number(object.commentCount) : 0,
      reactionCount: isSet(object.reactionCount) ? globalThis.Number(object.reactionCount) : 0,
      reactionCounts: isObject(object.reactionCounts)
        ? Object.entries(object.reactionCounts).reduce<{ [key: string]: number }>((acc, [key, value]) => {
          acc[key] = Number(value);
          return acc;
        }, {})
        : {},
      category: isSet(object.category) ? CategoryInfoResponse.fromJSON(object.category) : undefined,
      creator: isSet(object.creator) ? ActorInfoResponse.fromJSON(object.creator) : undefined,
      updater: isSet(object.updater) ? ActorInfoResponse.fromJSON(object.updater) : undefined,
    };
  },

  toJSON(message: PostResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    if (message.excerpt !== "") {
      obj.excerpt = message.excerpt;
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.tags?.length) {
      obj.tags = message.tags;
    }
    if (message.viewCount !== 0) {
      obj.viewCount = Math.round(message.viewCount);
    }
    if (message.commentCount !== 0) {
      obj.commentCount = Math.round(message.commentCount);
    }
    if (message.reactionCount !== 0) {
      obj.reactionCount = Math.round(message.reactionCount);
    }
    if (message.reactionCounts) {
      const entries = Object.entries(message.reactionCounts);
      if (entries.length > 0) {
        obj.reactionCounts = {};
        entries.forEach(([k, v]) => {
          obj.reactionCounts[k] = Math.round(v);
        });
      }
    }
    if (message.category !== undefined) {
      obj.category = CategoryInfoResponse.toJSON(message.category);
    }
    if (message.creator !== undefined) {
      obj.creator = ActorInfoResponse.toJSON(message.creator);
    }
    if (message.updater !== undefined) {
      obj.updater = ActorInfoResponse.toJSON(message.updater);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PostResponse>, I>>(base?: I): PostResponse {
    return PostResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PostResponse>, I>>(object: I): PostResponse {
    const message = createBasePostResponse();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.slug = object.slug ?? "";
    message.excerpt = object.excerpt ?? "";
    message.content = object.content ?? "";
    message.tags = object.tags?.map((e) => e) || [];
    message.viewCount = object.viewCount ?? 0;
    message.commentCount = object.commentCount ?? 0;
    message.reactionCount = object.reactionCount ?? 0;
    message.reactionCounts = Object.entries(object.reactionCounts ?? {}).reduce<{ [key: string]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.Number(value);
        }
        return acc;
      },
      {},
    );
    message.category = (object.category !== undefined && object.category !== null)
      ? CategoryInfoResponse.fromPartial(object.category)
      : undefined;
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? ActorInfoResponse.fromPartial(object.creator)
      : undefined;
    message.updater = (object.updater !== undefined && object.updater !== null)
      ? ActorInfoResponse.fromPartial(object.updater)
      : undefined;
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

  fromJSON(object: any): PostResponse_ReactionCountsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: PostResponse_ReactionCountsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PostResponse_ReactionCountsEntry>, I>>(
    base?: I,
  ): PostResponse_ReactionCountsEntry {
    return PostResponse_ReactionCountsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PostResponse_ReactionCountsEntry>, I>>(
    object: I,
  ): PostResponse_ReactionCountsEntry {
    const message = createBasePostResponse_ReactionCountsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
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

  fromJSON(object: any): SinglePostResponse {
    return { value: isSet(object.value) ? PostResponse.fromJSON(object.value) : undefined };
  },

  toJSON(message: SinglePostResponse): unknown {
    const obj: any = {};
    if (message.value !== undefined) {
      obj.value = PostResponse.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SinglePostResponse>, I>>(base?: I): SinglePostResponse {
    return SinglePostResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SinglePostResponse>, I>>(object: I): SinglePostResponse {
    const message = createBaseSinglePostResponse();
    message.value = (object.value !== undefined && object.value !== null)
      ? PostResponse.fromPartial(object.value)
      : undefined;
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

  fromJSON(object: any): ListPostsResponse {
    return {
      value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => PostResponse.fromJSON(e)) : [],
      paging: isSet(object.paging) ? PagingInfoResponse.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: ListPostsResponse): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value.map((e) => PostResponse.toJSON(e));
    }
    if (message.paging !== undefined) {
      obj.paging = PagingInfoResponse.toJSON(message.paging);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListPostsResponse>, I>>(base?: I): ListPostsResponse {
    return ListPostsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListPostsResponse>, I>>(object: I): ListPostsResponse {
    const message = createBaseListPostsResponse();
    message.value = object.value?.map((e) => PostResponse.fromPartial(e)) || [];
    message.paging = (object.paging !== undefined && object.paging !== null)
      ? PagingInfoResponse.fromPartial(object.paging)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
