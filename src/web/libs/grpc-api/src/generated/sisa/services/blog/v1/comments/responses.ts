/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";
import { ActorInfoResponse } from "../../../../libs/common/responses/actor_info_response";
import { PagingInfoResponse } from "../../../../libs/common/responses/paging_info_response";

export interface CommentResponse {
  /** data fields: from 1 to 50 */
  id: string;
  content: string;
  level: number;
  reactionCount: number;
  reactionCounts: { [key: string]: number };
  /** relationship fields: from 51 to 60 */
  parentId: string | undefined;
  postId: string;
  /** audit fields: from 63 to 70 */
  creator: ActorInfoResponse | undefined;
  updater: ActorInfoResponse | undefined;
}

export interface CommentResponse_ReactionCountsEntry {
  key: string;
  value: number;
}

export interface SingleCommentResponse {
  value: CommentResponse | undefined;
}

export interface ListCommentsResponse {
  value: CommentResponse[];
  paging: PagingInfoResponse | undefined;
}

function createBaseCommentResponse(): CommentResponse {
  return {
    id: "",
    content: "",
    level: 0,
    reactionCount: 0,
    reactionCounts: {},
    parentId: undefined,
    postId: "",
    creator: undefined,
    updater: undefined,
  };
}

export const CommentResponse = {
  encode(message: CommentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    if (message.level !== 0) {
      writer.uint32(24).int32(message.level);
    }
    if (message.reactionCount !== 0) {
      writer.uint32(32).int32(message.reactionCount);
    }
    Object.entries(message.reactionCounts).forEach(([key, value]) => {
      CommentResponse_ReactionCountsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    if (message.parentId !== undefined) {
      StringValue.encode({ value: message.parentId! }, writer.uint32(410).fork()).ldelim();
    }
    if (message.postId !== "") {
      writer.uint32(418).string(message.postId);
    }
    if (message.creator !== undefined) {
      ActorInfoResponse.encode(message.creator, writer.uint32(490).fork()).ldelim();
    }
    if (message.updater !== undefined) {
      ActorInfoResponse.encode(message.updater, writer.uint32(498).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommentResponse();
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

          message.content = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.level = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.reactionCount = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = CommentResponse_ReactionCountsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.reactionCounts[entry5.key] = entry5.value;
          }
          continue;
        case 51:
          if (tag !== 410) {
            break;
          }

          message.parentId = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 52:
          if (tag !== 418) {
            break;
          }

          message.postId = reader.string();
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

function createBaseCommentResponse_ReactionCountsEntry(): CommentResponse_ReactionCountsEntry {
  return { key: "", value: 0 };
}

export const CommentResponse_ReactionCountsEntry = {
  encode(message: CommentResponse_ReactionCountsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommentResponse_ReactionCountsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommentResponse_ReactionCountsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.int32();
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

function createBaseSingleCommentResponse(): SingleCommentResponse {
  return { value: undefined };
}

export const SingleCommentResponse = {
  encode(message: SingleCommentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      CommentResponse.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SingleCommentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleCommentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = CommentResponse.decode(reader, reader.uint32());
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

function createBaseListCommentsResponse(): ListCommentsResponse {
  return { value: [], paging: undefined };
}

export const ListCommentsResponse = {
  encode(message: ListCommentsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.value) {
      CommentResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingInfoResponse.encode(message.paging, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCommentsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCommentsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value.push(CommentResponse.decode(reader, reader.uint32()));
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
