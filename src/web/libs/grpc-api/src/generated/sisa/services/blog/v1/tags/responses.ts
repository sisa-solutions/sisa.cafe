/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";
import { ActorInfoResponse } from "../../../../libs/common/responses/actor_info_response";
import { PagingInfoResponse } from "../../../../libs/common/responses/paging_info_response";

export interface TagInfoResponse {
  id: string;
  name: string;
  slug: string;
  description: string | undefined;
  postCount: number;
}

export interface TagResponse {
  /** data fields: from 1 to 50 */
  id: string;
  name: string;
  slug: string;
  description: string | undefined;
  postCount: number;
  /** audit fields: from 63 to 70 */
  creator: ActorInfoResponse | undefined;
  updater: ActorInfoResponse | undefined;
}

export interface SingleTagResponse {
  value: TagResponse | undefined;
}

export interface ListTagsResponse {
  value: TagResponse[];
  paging: PagingInfoResponse | undefined;
}

function createBaseTagInfoResponse(): TagInfoResponse {
  return { id: "", name: "", slug: "", description: undefined, postCount: 0 };
}

export const TagInfoResponse = {
  encode(message: TagInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.slug !== "") {
      writer.uint32(26).string(message.slug);
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.postCount !== 0) {
      writer.uint32(40).int32(message.postCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TagInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTagInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.postCount = reader.int32();
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

function createBaseTagResponse(): TagResponse {
  return { id: "", name: "", slug: "", description: undefined, postCount: 0, creator: undefined, updater: undefined };
}

export const TagResponse = {
  encode(message: TagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.slug !== "") {
      writer.uint32(26).string(message.slug);
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.postCount !== 0) {
      writer.uint32(40).int32(message.postCount);
    }
    if (message.creator !== undefined) {
      ActorInfoResponse.encode(message.creator, writer.uint32(490).fork()).ldelim();
    }
    if (message.updater !== undefined) {
      ActorInfoResponse.encode(message.updater, writer.uint32(498).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TagResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.postCount = reader.int32();
          continue;
        case 61:
          if (tag !== 490) {
            break;
          }

          message.creator = ActorInfoResponse.decode(reader, reader.uint32());
          continue;
        case 62:
          if (tag !== 498) {
            break;
          }

          message.updater = ActorInfoResponse.decode(reader, reader.uint32());
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

function createBaseSingleTagResponse(): SingleTagResponse {
  return { value: undefined };
}

export const SingleTagResponse = {
  encode(message: SingleTagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      TagResponse.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SingleTagResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleTagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = TagResponse.decode(reader, reader.uint32());
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

function createBaseListTagsResponse(): ListTagsResponse {
  return { value: [], paging: undefined };
}

export const ListTagsResponse = {
  encode(message: ListTagsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.value) {
      TagResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingInfoResponse.encode(message.paging, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTagsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTagsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value.push(TagResponse.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.paging = PagingInfoResponse.decode(reader, reader.uint32());
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
