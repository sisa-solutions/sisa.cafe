/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { FilteringParams } from "../../../../libs/data/params/filtering_params";
import { PagingParams } from "../../../../libs/data/params/paging_params";
import { SortingParams } from "../../../../libs/data/params/sorting_params";

export interface FindTagByIdQuery {
  id: string;
}

export interface FindTagBySlugQuery {
  slug: string;
}

export interface GetTagsQuery {
  filter: FilteringParams | undefined;
  sortBy: SortingParams[];
  paging: PagingParams | undefined;
}

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
};

function createBaseFindTagBySlugQuery(): FindTagBySlugQuery {
  return { slug: "" };
}

export const FindTagBySlugQuery = {
  encode(message: FindTagBySlugQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slug !== "") {
      writer.uint32(10).string(message.slug);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindTagBySlugQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindTagBySlugQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.slug = reader.string();
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

function createBaseGetTagsQuery(): GetTagsQuery {
  return { filter: undefined, sortBy: [], paging: undefined };
}

export const GetTagsQuery = {
  encode(message: GetTagsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      FilteringParams.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.sortBy) {
      SortingParams.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingParams.encode(message.paging, writer.uint32(26).fork()).ldelim();
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

          message.filter = FilteringParams.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sortBy.push(SortingParams.decode(reader, reader.uint32()));
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
