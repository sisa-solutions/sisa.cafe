/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";
import { ActorInfoResponse } from "../../../../libs/common/responses/actor_info_response";
import { PagingInfoResponse } from "../../../../libs/common/responses/paging_info_response";

export const protobufPackage = "sisa.blog.api.v1.comments.responses";

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

  fromJSON(object: any): CommentResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      level: isSet(object.level) ? globalThis.Number(object.level) : 0,
      reactionCount: isSet(object.reactionCount) ? globalThis.Number(object.reactionCount) : 0,
      reactionCounts: isObject(object.reactionCounts)
        ? Object.entries(object.reactionCounts).reduce<{ [key: string]: number }>((acc, [key, value]) => {
          acc[key] = Number(value);
          return acc;
        }, {})
        : {},
      parentId: isSet(object.parentId) ? String(object.parentId) : undefined,
      postId: isSet(object.postId) ? globalThis.String(object.postId) : "",
      creator: isSet(object.creator) ? ActorInfoResponse.fromJSON(object.creator) : undefined,
      updater: isSet(object.updater) ? ActorInfoResponse.fromJSON(object.updater) : undefined,
    };
  },

  toJSON(message: CommentResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.level !== 0) {
      obj.level = Math.round(message.level);
    }
    if (message.reactionCount !== 0) {
      obj.reactionCount = Math.round(message.reactionCount);
    }
    if (message.reactionCounts) {
      const entries = Object.entries(message.reactionCounts);
      if (entries.length > 0) {
        obj.reactionCounts = {};
        entries.forEach(([k, v]) => {
          obj.reactionCounts[k] = Math.round(v);
        });
      }
    }
    if (message.parentId !== undefined) {
      obj.parentId = message.parentId;
    }
    if (message.postId !== "") {
      obj.postId = message.postId;
    }
    if (message.creator !== undefined) {
      obj.creator = ActorInfoResponse.toJSON(message.creator);
    }
    if (message.updater !== undefined) {
      obj.updater = ActorInfoResponse.toJSON(message.updater);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommentResponse>, I>>(base?: I): CommentResponse {
    return CommentResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommentResponse>, I>>(object: I): CommentResponse {
    const message = createBaseCommentResponse();
    message.id = object.id ?? "";
    message.content = object.content ?? "";
    message.level = object.level ?? 0;
    message.reactionCount = object.reactionCount ?? 0;
    message.reactionCounts = Object.entries(object.reactionCounts ?? {}).reduce<{ [key: string]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.Number(value);
        }
        return acc;
      },
      {},
    );
    message.parentId = object.parentId ?? undefined;
    message.postId = object.postId ?? "";
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? ActorInfoResponse.fromPartial(object.creator)
      : undefined;
    message.updater = (object.updater !== undefined && object.updater !== null)
      ? ActorInfoResponse.fromPartial(object.updater)
      : undefined;
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

  fromJSON(object: any): CommentResponse_ReactionCountsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: CommentResponse_ReactionCountsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommentResponse_ReactionCountsEntry>, I>>(
    base?: I,
  ): CommentResponse_ReactionCountsEntry {
    return CommentResponse_ReactionCountsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommentResponse_ReactionCountsEntry>, I>>(
    object: I,
  ): CommentResponse_ReactionCountsEntry {
    const message = createBaseCommentResponse_ReactionCountsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
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

  fromJSON(object: any): SingleCommentResponse {
    return { value: isSet(object.value) ? CommentResponse.fromJSON(object.value) : undefined };
  },

  toJSON(message: SingleCommentResponse): unknown {
    const obj: any = {};
    if (message.value !== undefined) {
      obj.value = CommentResponse.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SingleCommentResponse>, I>>(base?: I): SingleCommentResponse {
    return SingleCommentResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SingleCommentResponse>, I>>(object: I): SingleCommentResponse {
    const message = createBaseSingleCommentResponse();
    message.value = (object.value !== undefined && object.value !== null)
      ? CommentResponse.fromPartial(object.value)
      : undefined;
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

  fromJSON(object: any): ListCommentsResponse {
    return {
      value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => CommentResponse.fromJSON(e)) : [],
      paging: isSet(object.paging) ? PagingInfoResponse.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: ListCommentsResponse): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value.map((e) => CommentResponse.toJSON(e));
    }
    if (message.paging !== undefined) {
      obj.paging = PagingInfoResponse.toJSON(message.paging);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListCommentsResponse>, I>>(base?: I): ListCommentsResponse {
    return ListCommentsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListCommentsResponse>, I>>(object: I): ListCommentsResponse {
    const message = createBaseListCommentsResponse();
    message.value = object.value?.map((e) => CommentResponse.fromPartial(e)) || [];
    message.paging = (object.paging !== undefined && object.paging !== null)
      ? PagingInfoResponse.fromPartial(object.paging)
      : undefined;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
