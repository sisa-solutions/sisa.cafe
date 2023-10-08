/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { FilteringParams } from "../../../../libs/data/params/filtering_params";
import { PagingParams } from "../../../../libs/data/params/paging_params";
import { SortingParams } from "../../../../libs/data/params/sorting_params";

export const protobufPackage = "sisa.blog.api.v1.tags.queries";

export interface FindTagByIdQuery {
  id: string;
}

export interface FindTagBySlugQuery {
  slug: string;
}

export interface GetTagsQuery {
  filter: FilteringParams | undefined;
  sortBy: SortingParams[];
  paging: PagingParams | undefined;
}

function createBaseFindTagByIdQuery(): FindTagByIdQuery {
  return { id: "" };
}

export const FindTagByIdQuery = {
  encode(message: FindTagByIdQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindTagByIdQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindTagByIdQuery();
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

  fromJSON(object: any): FindTagByIdQuery {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: FindTagByIdQuery): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindTagByIdQuery>, I>>(base?: I): FindTagByIdQuery {
    return FindTagByIdQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindTagByIdQuery>, I>>(object: I): FindTagByIdQuery {
    const message = createBaseFindTagByIdQuery();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseFindTagBySlugQuery(): FindTagBySlugQuery {
  return { slug: "" };
}

export const FindTagBySlugQuery = {
  encode(message: FindTagBySlugQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slug !== "") {
      writer.uint32(10).string(message.slug);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindTagBySlugQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindTagBySlugQuery();
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

  fromJSON(object: any): FindTagBySlugQuery {
    return { slug: isSet(object.slug) ? globalThis.String(object.slug) : "" };
  },

  toJSON(message: FindTagBySlugQuery): unknown {
    const obj: any = {};
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindTagBySlugQuery>, I>>(base?: I): FindTagBySlugQuery {
    return FindTagBySlugQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindTagBySlugQuery>, I>>(object: I): FindTagBySlugQuery {
    const message = createBaseFindTagBySlugQuery();
    message.slug = object.slug ?? "";
    return message;
  },
};

function createBaseGetTagsQuery(): GetTagsQuery {
  return { filter: undefined, sortBy: [], paging: undefined };
}

export const GetTagsQuery = {
  encode(message: GetTagsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTagsQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTagsQuery();
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

  fromJSON(object: any): GetTagsQuery {
    return {
      filter: isSet(object.filter) ? FilteringParams.fromJSON(object.filter) : undefined,
      sortBy: globalThis.Array.isArray(object?.sortBy) ? object.sortBy.map((e: any) => SortingParams.fromJSON(e)) : [],
      paging: isSet(object.paging) ? PagingParams.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: GetTagsQuery): unknown {
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

  create<I extends Exact<DeepPartial<GetTagsQuery>, I>>(base?: I): GetTagsQuery {
    return GetTagsQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetTagsQuery>, I>>(object: I): GetTagsQuery {
    const message = createBaseGetTagsQuery();
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
