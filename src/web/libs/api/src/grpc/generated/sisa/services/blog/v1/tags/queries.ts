/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PagingParams } from "../../../../libs/common/params/paging_params";

export const protobufPackage = "sisa.blog.api";

export interface FilterTagsParams {
  name: string;
}

export interface GetTagsQuery {
  filter: FilterTagsParams | undefined;
  paging: PagingParams | undefined;
}

export interface FindTagByIdQuery {
  id: string;
}

function createBaseFilterTagsParams(): FilterTagsParams {
  return { name: "" };
}

export const FilterTagsParams = {
  encode(message: FilterTagsParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FilterTagsParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilterTagsParams();
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

  fromJSON(object: any): FilterTagsParams {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: FilterTagsParams): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FilterTagsParams>, I>>(base?: I): FilterTagsParams {
    return FilterTagsParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FilterTagsParams>, I>>(object: I): FilterTagsParams {
    const message = createBaseFilterTagsParams();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseGetTagsQuery(): GetTagsQuery {
  return { filter: undefined, paging: undefined };
}

export const GetTagsQuery = {
  encode(message: GetTagsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      FilterTagsParams.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingParams.encode(message.paging, writer.uint32(18).fork()).ldelim();
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

          message.filter = FilterTagsParams.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetTagsQuery {
    return {
      filter: isSet(object.filter) ? FilterTagsParams.fromJSON(object.filter) : undefined,
      paging: isSet(object.paging) ? PagingParams.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: GetTagsQuery): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = FilterTagsParams.toJSON(message.filter);
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
      ? FilterTagsParams.fromPartial(object.filter)
      : undefined;
    message.paging = (object.paging !== undefined && object.paging !== null)
      ? PagingParams.fromPartial(object.paging)
      : undefined;
    return message;
  },
};

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
    return { id: isSet(object.id) ? String(object.id) : "" };
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
