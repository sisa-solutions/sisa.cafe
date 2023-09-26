/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PagingQuery } from "../../../../libs/common/queries/paging_query";

export const protobufPackage = "sisa.blog.api";

export interface FilterCategoriesQuery {
  name: string;
}

export interface GetCategoriesQuery {
  filter: FilterCategoriesQuery | undefined;
  paging: PagingQuery | undefined;
}

export interface FindCategoryByIdQuery {
  id: string;
}

function createBaseFilterCategoriesQuery(): FilterCategoriesQuery {
  return { name: "" };
}

export const FilterCategoriesQuery = {
  encode(message: FilterCategoriesQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FilterCategoriesQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilterCategoriesQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FilterCategoriesQuery {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: FilterCategoriesQuery): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FilterCategoriesQuery>, I>>(base?: I): FilterCategoriesQuery {
    return FilterCategoriesQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FilterCategoriesQuery>, I>>(object: I): FilterCategoriesQuery {
    const message = createBaseFilterCategoriesQuery();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseGetCategoriesQuery(): GetCategoriesQuery {
  return { filter: undefined, paging: undefined };
}

export const GetCategoriesQuery = {
  encode(message: GetCategoriesQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      FilterCategoriesQuery.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingQuery.encode(message.paging, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCategoriesQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCategoriesQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = FilterCategoriesQuery.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.paging = PagingQuery.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCategoriesQuery {
    return {
      filter: isSet(object.filter) ? FilterCategoriesQuery.fromJSON(object.filter) : undefined,
      paging: isSet(object.paging) ? PagingQuery.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: GetCategoriesQuery): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = FilterCategoriesQuery.toJSON(message.filter);
    }
    if (message.paging !== undefined) {
      obj.paging = PagingQuery.toJSON(message.paging);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCategoriesQuery>, I>>(base?: I): GetCategoriesQuery {
    return GetCategoriesQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCategoriesQuery>, I>>(object: I): GetCategoriesQuery {
    const message = createBaseGetCategoriesQuery();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? FilterCategoriesQuery.fromPartial(object.filter)
      : undefined;
    message.paging = (object.paging !== undefined && object.paging !== null)
      ? PagingQuery.fromPartial(object.paging)
      : undefined;
    return message;
  },
};

function createBaseFindCategoryByIdQuery(): FindCategoryByIdQuery {
  return { id: "" };
}

export const FindCategoryByIdQuery = {
  encode(message: FindCategoryByIdQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindCategoryByIdQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindCategoryByIdQuery();
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

  fromJSON(object: any): FindCategoryByIdQuery {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: FindCategoryByIdQuery): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindCategoryByIdQuery>, I>>(base?: I): FindCategoryByIdQuery {
    return FindCategoryByIdQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindCategoryByIdQuery>, I>>(object: I): FindCategoryByIdQuery {
    const message = createBaseFindCategoryByIdQuery();
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
