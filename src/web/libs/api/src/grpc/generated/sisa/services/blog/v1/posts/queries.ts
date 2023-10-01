/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PagingParams } from "../../../../libs/common/params/paging_params";

export const protobufPackage = "sisa.blog.api";

export interface FilterPostsParams {
  keyword: string;
  categories: string[];
  tags: string[];
}

export interface GetPostsQuery {
  filter: FilterPostsParams | undefined;
  paging: PagingParams | undefined;
}

export interface FindPostByIdQuery {
  id: string;
}

function createBaseFilterPostsParams(): FilterPostsParams {
  return { keyword: "", categories: [], tags: [] };
}

export const FilterPostsParams = {
  encode(message: FilterPostsParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keyword !== "") {
      writer.uint32(10).string(message.keyword);
    }
    for (const v of message.categories) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.tags) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FilterPostsParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilterPostsParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keyword = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.categories.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tags.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FilterPostsParams {
    return {
      keyword: isSet(object.keyword) ? String(object.keyword) : "",
      categories: Array.isArray(object?.categories) ? object.categories.map((e: any) => String(e)) : [],
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: FilterPostsParams): unknown {
    const obj: any = {};
    if (message.keyword !== "") {
      obj.keyword = message.keyword;
    }
    if (message.categories?.length) {
      obj.categories = message.categories;
    }
    if (message.tags?.length) {
      obj.tags = message.tags;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FilterPostsParams>, I>>(base?: I): FilterPostsParams {
    return FilterPostsParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FilterPostsParams>, I>>(object: I): FilterPostsParams {
    const message = createBaseFilterPostsParams();
    message.keyword = object.keyword ?? "";
    message.categories = object.categories?.map((e) => e) || [];
    message.tags = object.tags?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetPostsQuery(): GetPostsQuery {
  return { filter: undefined, paging: undefined };
}

export const GetPostsQuery = {
  encode(message: GetPostsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      FilterPostsParams.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingParams.encode(message.paging, writer.uint32(18).fork()).ldelim();
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

          message.filter = FilterPostsParams.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
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
      filter: isSet(object.filter) ? FilterPostsParams.fromJSON(object.filter) : undefined,
      paging: isSet(object.paging) ? PagingParams.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: GetPostsQuery): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = FilterPostsParams.toJSON(message.filter);
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
      ? FilterPostsParams.fromPartial(object.filter)
      : undefined;
    message.paging = (object.paging !== undefined && object.paging !== null)
      ? PagingParams.fromPartial(object.paging)
      : undefined;
    return message;
  },
};

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
    return { id: isSet(object.id) ? String(object.id) : "" };
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
