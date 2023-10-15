/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { FilteringParams } from "../../../../libs/data/params/filtering_params";
import { PagingParams } from "../../../../libs/data/params/paging_params";
import { SortingParams } from "../../../../libs/data/params/sorting_params";

export const protobufPackage = "sisa.blog.api.v1.posts.queries";

export interface FindPostByIdQuery {
  id: string;
}

export interface GetPostsQuery {
  filter: FilteringParams | undefined;
  sortBy: SortingParams[];
  paging: PagingParams | undefined;
}

export interface GetCommentsByPostIdQuery {
  postId: string;
  paging: PagingParams | undefined;
}

export interface FindPublishedPostBySlugQuery {
  slug: string;
}

export interface GetPublishedPostsQuery {
  paging: PagingParams | undefined;
}

function createBaseFindPostByIdQuery(): FindPostByIdQuery {
  return { id: "" };
}

export const FindPostByIdQuery = {
  encode(message: FindPostByIdQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindPostByIdQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindPostByIdQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindPostByIdQuery {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: FindPostByIdQuery): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindPostByIdQuery>, I>>(base?: I): FindPostByIdQuery {
    return FindPostByIdQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindPostByIdQuery>, I>>(object: I): FindPostByIdQuery {
    const message = createBaseFindPostByIdQuery();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetPostsQuery(): GetPostsQuery {
  return { filter: undefined, sortBy: [], paging: undefined };
}

export const GetPostsQuery = {
  encode(message: GetPostsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      FilteringParams.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.sortBy) {
      SortingParams.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingParams.encode(message.paging, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPostsQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPostsQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = FilteringParams.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sortBy.push(SortingParams.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.paging = PagingParams.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPostsQuery {
    return {
      filter: isSet(object.filter) ? FilteringParams.fromJSON(object.filter) : undefined,
      sortBy: globalThis.Array.isArray(object?.sortBy) ? object.sortBy.map((e: any) => SortingParams.fromJSON(e)) : [],
      paging: isSet(object.paging) ? PagingParams.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: GetPostsQuery): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = FilteringParams.toJSON(message.filter);
    }
    if (message.sortBy?.length) {
      obj.sortBy = message.sortBy.map((e) => SortingParams.toJSON(e));
    }
    if (message.paging !== undefined) {
      obj.paging = PagingParams.toJSON(message.paging);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPostsQuery>, I>>(base?: I): GetPostsQuery {
    return GetPostsQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPostsQuery>, I>>(object: I): GetPostsQuery {
    const message = createBaseGetPostsQuery();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? FilteringParams.fromPartial(object.filter)
      : undefined;
    message.sortBy = object.sortBy?.map((e) => SortingParams.fromPartial(e)) || [];
    message.paging = (object.paging !== undefined && object.paging !== null)
      ? PagingParams.fromPartial(object.paging)
      : undefined;
    return message;
  },
};

function createBaseGetCommentsByPostIdQuery(): GetCommentsByPostIdQuery {
  return { postId: "", paging: undefined };
}

export const GetCommentsByPostIdQuery = {
  encode(message: GetCommentsByPostIdQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.postId !== "") {
      writer.uint32(10).string(message.postId);
    }
    if (message.paging !== undefined) {
      PagingParams.encode(message.paging, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCommentsByPostIdQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCommentsByPostIdQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.postId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.paging = PagingParams.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCommentsByPostIdQuery {
    return {
      postId: isSet(object.postId) ? globalThis.String(object.postId) : "",
      paging: isSet(object.paging) ? PagingParams.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: GetCommentsByPostIdQuery): unknown {
    const obj: any = {};
    if (message.postId !== "") {
      obj.postId = message.postId;
    }
    if (message.paging !== undefined) {
      obj.paging = PagingParams.toJSON(message.paging);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCommentsByPostIdQuery>, I>>(base?: I): GetCommentsByPostIdQuery {
    return GetCommentsByPostIdQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCommentsByPostIdQuery>, I>>(object: I): GetCommentsByPostIdQuery {
    const message = createBaseGetCommentsByPostIdQuery();
    message.postId = object.postId ?? "";
    message.paging = (object.paging !== undefined && object.paging !== null)
      ? PagingParams.fromPartial(object.paging)
      : undefined;
    return message;
  },
};

function createBaseFindPublishedPostBySlugQuery(): FindPublishedPostBySlugQuery {
  return { slug: "" };
}

export const FindPublishedPostBySlugQuery = {
  encode(message: FindPublishedPostBySlugQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slug !== "") {
      writer.uint32(10).string(message.slug);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindPublishedPostBySlugQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindPublishedPostBySlugQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.slug = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindPublishedPostBySlugQuery {
    return { slug: isSet(object.slug) ? globalThis.String(object.slug) : "" };
  },

  toJSON(message: FindPublishedPostBySlugQuery): unknown {
    const obj: any = {};
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindPublishedPostBySlugQuery>, I>>(base?: I): FindPublishedPostBySlugQuery {
    return FindPublishedPostBySlugQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindPublishedPostBySlugQuery>, I>>(object: I): FindPublishedPostBySlugQuery {
    const message = createBaseFindPublishedPostBySlugQuery();
    message.slug = object.slug ?? "";
    return message;
  },
};

function createBaseGetPublishedPostsQuery(): GetPublishedPostsQuery {
  return { paging: undefined };
}

export const GetPublishedPostsQuery = {
  encode(message: GetPublishedPostsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.paging !== undefined) {
      PagingParams.encode(message.paging, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPublishedPostsQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPublishedPostsQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 26) {
            break;
          }

          message.paging = PagingParams.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetPublishedPostsQuery {
    return { paging: isSet(object.paging) ? PagingParams.fromJSON(object.paging) : undefined };
  },

  toJSON(message: GetPublishedPostsQuery): unknown {
    const obj: any = {};
    if (message.paging !== undefined) {
      obj.paging = PagingParams.toJSON(message.paging);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetPublishedPostsQuery>, I>>(base?: I): GetPublishedPostsQuery {
    return GetPublishedPostsQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetPublishedPostsQuery>, I>>(object: I): GetPublishedPostsQuery {
    const message = createBaseGetPublishedPostsQuery();
    message.paging = (object.paging !== undefined && object.paging !== null)
      ? PagingParams.fromPartial(object.paging)
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
