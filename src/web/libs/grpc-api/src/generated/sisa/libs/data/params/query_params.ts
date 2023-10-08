/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { FilteringParams } from "./filtering_params";
import { PagingParams } from "./paging_params";
import { SortingParams } from "./sorting_params";

export const protobufPackage = "sisa.data.params";

export interface QueryParams {
  filter: FilteringParams | undefined;
  sortBy: SortingParams | undefined;
  paging: PagingParams | undefined;
}

function createBaseQueryParams(): QueryParams {
  return { filter: undefined, sortBy: undefined, paging: undefined };
}

export const QueryParams = {
  encode(message: QueryParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      FilteringParams.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.sortBy !== undefined) {
      SortingParams.encode(message.sortBy, writer.uint32(18).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingParams.encode(message.paging, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParams();
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

          message.sortBy = SortingParams.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryParams {
    return {
      filter: isSet(object.filter) ? FilteringParams.fromJSON(object.filter) : undefined,
      sortBy: isSet(object.sortBy) ? SortingParams.fromJSON(object.sortBy) : undefined,
      paging: isSet(object.paging) ? PagingParams.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: QueryParams): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = FilteringParams.toJSON(message.filter);
    }
    if (message.sortBy !== undefined) {
      obj.sortBy = SortingParams.toJSON(message.sortBy);
    }
    if (message.paging !== undefined) {
      obj.paging = PagingParams.toJSON(message.paging);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParams>, I>>(base?: I): QueryParams {
    return QueryParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParams>, I>>(object: I): QueryParams {
    const message = createBaseQueryParams();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? FilteringParams.fromPartial(object.filter)
      : undefined;
    message.sortBy = (object.sortBy !== undefined && object.sortBy !== null)
      ? SortingParams.fromPartial(object.sortBy)
      : undefined;
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
