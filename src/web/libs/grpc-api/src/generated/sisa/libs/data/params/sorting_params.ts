/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SortDirection } from "../../common/enums/sort_direction";

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
};
