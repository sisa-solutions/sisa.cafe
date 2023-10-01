/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PagingResponse } from "../../../../libs/common/responses/paging_response";
import { CategoryInfoResponse } from "../categories/responses";
import { TagResponse } from "../tags/responses";
import { PostStatus, postStatusFromJSON, postStatusToJSON } from "./enums";

export const protobufPackage = "sisa.blog.api";

export interface PostResponse {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: PostStatus;
  category: CategoryInfoResponse | undefined;
  tags: TagResponse[];
}

export interface SinglePostResponse {
  value: PostResponse | undefined;
}

export interface ListPostsResponse {
  value: PostResponse[];
  paging: PagingResponse | undefined;
}

function createBasePostResponse(): PostResponse {
  return {
    id: "",
    categoryId: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: 0,
    category: undefined,
    tags: [],
  };
}

export const PostResponse = {
  encode(message: PostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.categoryId !== "") {
      writer.uint32(18).string(message.categoryId);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.slug !== "") {
      writer.uint32(34).string(message.slug);
    }
    if (message.excerpt !== "") {
      writer.uint32(42).string(message.excerpt);
    }
    if (message.content !== "") {
      writer.uint32(50).string(message.content);
    }
    if (message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    if (message.category !== undefined) {
      CategoryInfoResponse.encode(message.category, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.tags) {
      TagResponse.encode(v!, writer.uint32(74).fork()).ldelim();
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

          message.categoryId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.title = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.excerpt = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.content = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.category = CategoryInfoResponse.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.tags.push(TagResponse.decode(reader, reader.uint32()));
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
      id: isSet(object.id) ? String(object.id) : "",
      categoryId: isSet(object.categoryId) ? String(object.categoryId) : "",
      title: isSet(object.title) ? String(object.title) : "",
      slug: isSet(object.slug) ? String(object.slug) : "",
      excerpt: isSet(object.excerpt) ? String(object.excerpt) : "",
      content: isSet(object.content) ? String(object.content) : "",
      status: isSet(object.status) ? postStatusFromJSON(object.status) : 0,
      category: isSet(object.category) ? CategoryInfoResponse.fromJSON(object.category) : undefined,
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => TagResponse.fromJSON(e)) : [],
    };
  },

  toJSON(message: PostResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.categoryId !== "") {
      obj.categoryId = message.categoryId;
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
    if (message.status !== 0) {
      obj.status = postStatusToJSON(message.status);
    }
    if (message.category !== undefined) {
      obj.category = CategoryInfoResponse.toJSON(message.category);
    }
    if (message.tags?.length) {
      obj.tags = message.tags.map((e) => TagResponse.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PostResponse>, I>>(base?: I): PostResponse {
    return PostResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PostResponse>, I>>(object: I): PostResponse {
    const message = createBasePostResponse();
    message.id = object.id ?? "";
    message.categoryId = object.categoryId ?? "";
    message.title = object.title ?? "";
    message.slug = object.slug ?? "";
    message.excerpt = object.excerpt ?? "";
    message.content = object.content ?? "";
    message.status = object.status ?? 0;
    message.category = (object.category !== undefined && object.category !== null)
      ? CategoryInfoResponse.fromPartial(object.category)
      : undefined;
    message.tags = object.tags?.map((e) => TagResponse.fromPartial(e)) || [];
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
      PagingResponse.encode(message.paging, writer.uint32(18).fork()).ldelim();
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

          message.paging = PagingResponse.decode(reader, reader.uint32());
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
      value: Array.isArray(object?.value) ? object.value.map((e: any) => PostResponse.fromJSON(e)) : [],
      paging: isSet(object.paging) ? PagingResponse.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: ListPostsResponse): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value.map((e) => PostResponse.toJSON(e));
    }
    if (message.paging !== undefined) {
      obj.paging = PagingResponse.toJSON(message.paging);
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
      ? PagingResponse.fromPartial(object.paging)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
