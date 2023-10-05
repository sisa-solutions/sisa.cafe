/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SortDirection, sortDirectionFromJSON, sortDirectionToJSON } from "../../common/enums/sort_direction";

export const protobufPackage = "sisa.data.params";

export interface SortingParams {
  field: string;
  sort: SortDirection;
}

function createBaseSortingParams(): SortingParams {
  return { field: "", sort: 0 };
}

export const SortingParams = {
  encode(message: SortingParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    if (message.sort !== 0) {
      writer.uint32(16).int32(message.sort);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SortingParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSortingParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.sort = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SortingParams {
    return {
      field: isSet(object.field) ? globalThis.String(object.field) : "",
      sort: isSet(object.sort) ? sortDirectionFromJSON(object.sort) : 0,
    };
  },

  toJSON(message: SortingParams): unknown {
    const obj: any = {};
    if (message.field !== "") {
      obj.field = message.field;
    }
    if (message.sort !== 0) {
      obj.sort = sortDirectionToJSON(message.sort);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SortingParams>, I>>(base?: I): SortingParams {
    return SortingParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SortingParams>, I>>(object: I): SortingParams {
    const message = createBaseSortingParams();
    message.field = object.field ?? "";
    message.sort = object.sort ?? 0;
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
