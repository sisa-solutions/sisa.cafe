/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "sisa.data.params";

export interface PagingParams {
  pageIndex: number;
  pageSize: number;
}

function createBasePagingParams(): PagingParams {
  return { pageIndex: 0, pageSize: 0 };
}

export const PagingParams = {
  encode(message: PagingParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageIndex !== 0) {
      writer.uint32(8).int32(message.pageIndex);
    }
    if (message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PagingParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePagingParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pageIndex = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PagingParams {
    return {
      pageIndex: isSet(object.pageIndex) ? globalThis.Number(object.pageIndex) : 0,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
    };
  },

  toJSON(message: PagingParams): unknown {
    const obj: any = {};
    if (message.pageIndex !== 0) {
      obj.pageIndex = Math.round(message.pageIndex);
    }
    if (message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PagingParams>, I>>(base?: I): PagingParams {
    return PagingParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PagingParams>, I>>(object: I): PagingParams {
    const message = createBasePagingParams();
    message.pageIndex = object.pageIndex ?? 0;
    message.pageSize = object.pageSize ?? 0;
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
