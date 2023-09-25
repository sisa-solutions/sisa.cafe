/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "sisa.common";

export interface PagingResponse {
  count: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

function createBasePagingResponse(): PagingResponse {
  return { count: 0, page: 0, pageSize: 0, pageCount: 0 };
}

export const PagingResponse = {
  encode(message: PagingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.count !== 0) {
      writer.uint32(8).int64(message.count);
    }
    if (message.page !== 0) {
      writer.uint32(16).int32(message.page);
    }
    if (message.pageSize !== 0) {
      writer.uint32(24).int32(message.pageSize);
    }
    if (message.pageCount !== 0) {
      writer.uint32(32).int32(message.pageCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PagingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePagingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.count = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.page = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.pageCount = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PagingResponse {
    return {
      count: isSet(object.count) ? Number(object.count) : 0,
      page: isSet(object.page) ? Number(object.page) : 0,
      pageSize: isSet(object.pageSize) ? Number(object.pageSize) : 0,
      pageCount: isSet(object.pageCount) ? Number(object.pageCount) : 0,
    };
  },

  toJSON(message: PagingResponse): unknown {
    const obj: any = {};
    if (message.count !== 0) {
      obj.count = Math.round(message.count);
    }
    if (message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    if (message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageCount !== 0) {
      obj.pageCount = Math.round(message.pageCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PagingResponse>, I>>(base?: I): PagingResponse {
    return PagingResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PagingResponse>, I>>(object: I): PagingResponse {
    const message = createBasePagingResponse();
    message.count = object.count ?? 0;
    message.page = object.page ?? 0;
    message.pageSize = object.pageSize ?? 0;
    message.pageCount = object.pageCount ?? 0;
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
