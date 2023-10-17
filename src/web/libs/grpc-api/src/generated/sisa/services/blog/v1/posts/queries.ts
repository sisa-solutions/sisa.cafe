/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { FilteringParams } from "../../../../libs/data/params/filtering_params";
import { PagingParams } from "../../../../libs/data/params/paging_params";
import { SortingParams } from "../../../../libs/data/params/sorting_params";

export interface FindPostByIdQuery {
  id: string;
}

export interface GetPostsQuery {
  filter: FilteringParams | undefined;
  sortBy: SortingParams[];
  paging: PagingParams | undefined;
}

export interface GetCommentsByPostIdQuery {
  postId: string;
  paging: PagingParams | undefined;
}

export interface FindPublishedPostBySlugQuery {
  slug: string;
}

export interface GetPublishedPostsQuery {
  filter: FilteringParams | undefined;
  paging: PagingParams | undefined;
}

function createBaseFindPostByIdQuery(): FindPostByIdQuery {
  return { id: "" };
}

export const FindPostByIdQuery = {
  encode(message: FindPostByIdQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindPostByIdQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindPostByIdQuery();
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

function createBaseGetPostsQuery(): GetPostsQuery {
  return { filter: undefined, sortBy: [], paging: undefined };
}

export const GetPostsQuery = {
  encode(message: GetPostsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPostsQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPostsQuery();
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

function createBaseGetCommentsByPostIdQuery(): GetCommentsByPostIdQuery {
  return { postId: "", paging: undefined };
}

export const GetCommentsByPostIdQuery = {
  encode(message: GetCommentsByPostIdQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.postId !== "") {
      writer.uint32(10).string(message.postId);
    }
    if (message.paging !== undefined) {
      PagingParams.encode(message.paging, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCommentsByPostIdQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCommentsByPostIdQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.postId = reader.string();
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

function createBaseFindPublishedPostBySlugQuery(): FindPublishedPostBySlugQuery {
  return { slug: "" };
}

export const FindPublishedPostBySlugQuery = {
  encode(message: FindPublishedPostBySlugQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slug !== "") {
      writer.uint32(10).string(message.slug);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindPublishedPostBySlugQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindPublishedPostBySlugQuery();
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

function createBaseGetPublishedPostsQuery(): GetPublishedPostsQuery {
  return { filter: undefined, paging: undefined };
}

export const GetPublishedPostsQuery = {
  encode(message: GetPublishedPostsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      FilteringParams.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingParams.encode(message.paging, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPublishedPostsQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPublishedPostsQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = FilteringParams.decode(reader, reader.uint32());
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
