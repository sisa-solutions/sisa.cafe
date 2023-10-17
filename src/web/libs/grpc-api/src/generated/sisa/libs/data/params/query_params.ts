/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { FilteringParams } from "./filtering_params";
import { PagingParams } from "./paging_params";
import { SortingParams } from "./sorting_params";

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
};
