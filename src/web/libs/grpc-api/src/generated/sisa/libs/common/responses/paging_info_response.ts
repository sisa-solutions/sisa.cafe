/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

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
};

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
