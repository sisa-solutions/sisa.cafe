/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "sisa.common.responses";

export interface PagingInfoResponse {
  pageIndex: number;
  pageSize: number;
  itemCount: number;
  pageCount: number;
}

function createBasePagingInfoResponse(): PagingInfoResponse {
  return { pageIndex: 0, pageSize: 0, itemCount: 0, pageCount: 0 };
}

export const PagingInfoResponse = {
  encode(message: PagingInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pageIndex !== 0) {
      writer.uint32(8).int32(message.pageIndex);
    }
    if (message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.itemCount !== 0) {
      writer.uint32(24).int64(message.itemCount);
    }
    if (message.pageCount !== 0) {
      writer.uint32(32).int32(message.pageCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PagingInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePagingInfoResponse();
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
        case 3:
          if (tag !== 24) {
            break;
          }

          message.itemCount = longToNumber(reader.int64() as Long);
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

  fromJSON(object: any): PagingInfoResponse {
    return {
      pageIndex: isSet(object.pageIndex) ? globalThis.Number(object.pageIndex) : 0,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      itemCount: isSet(object.itemCount) ? globalThis.Number(object.itemCount) : 0,
      pageCount: isSet(object.pageCount) ? globalThis.Number(object.pageCount) : 0,
    };
  },

  toJSON(message: PagingInfoResponse): unknown {
    const obj: any = {};
    if (message.pageIndex !== 0) {
      obj.pageIndex = Math.round(message.pageIndex);
    }
    if (message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.itemCount !== 0) {
      obj.itemCount = Math.round(message.itemCount);
    }
    if (message.pageCount !== 0) {
      obj.pageCount = Math.round(message.pageCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PagingInfoResponse>, I>>(base?: I): PagingInfoResponse {
    return PagingInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PagingInfoResponse>, I>>(object: I): PagingInfoResponse {
    const message = createBasePagingInfoResponse();
    message.pageIndex = object.pageIndex ?? 0;
    message.pageSize = object.pageSize ?? 0;
    message.itemCount = object.itemCount ?? 0;
    message.pageCount = object.pageCount ?? 0;
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
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
