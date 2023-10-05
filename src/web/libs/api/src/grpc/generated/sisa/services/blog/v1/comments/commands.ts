/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "sisa.blog.api.v1.comments.commands";

export interface ReplyCommentCommand {
  /** data fields: from 1 to 50 */
  content: string;
  /** relationship fields: from 51 to 60 */
  parentId: string;
}

export interface UpdateCommentCommand {
  /** data fields: from 1 to 50 */
  id: string;
  content: string;
}

export interface DeleteCommentCommand {
  id: string;
}

export interface ReactToCommentCommand {
  /** data fields: from 1 to 50 */
  id: string;
  type: string;
}

function createBaseReplyCommentCommand(): ReplyCommentCommand {
  return { content: "", parentId: "" };
}

export const ReplyCommentCommand = {
  encode(message: ReplyCommentCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    if (message.parentId !== "") {
      writer.uint32(410).string(message.parentId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReplyCommentCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplyCommentCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = reader.string();
          continue;
        case 51:
          if (tag !== 410) {
            break;
          }

          message.parentId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReplyCommentCommand {
    return {
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      parentId: isSet(object.parentId) ? globalThis.String(object.parentId) : "",
    };
  },

  toJSON(message: ReplyCommentCommand): unknown {
    const obj: any = {};
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.parentId !== "") {
      obj.parentId = message.parentId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReplyCommentCommand>, I>>(base?: I): ReplyCommentCommand {
    return ReplyCommentCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReplyCommentCommand>, I>>(object: I): ReplyCommentCommand {
    const message = createBaseReplyCommentCommand();
    message.content = object.content ?? "";
    message.parentId = object.parentId ?? "";
    return message;
  },
};

function createBaseUpdateCommentCommand(): UpdateCommentCommand {
  return { id: "", content: "" };
}

export const UpdateCommentCommand = {
  encode(message: UpdateCommentCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCommentCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCommentCommand();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateCommentCommand {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
    };
  },

  toJSON(message: UpdateCommentCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCommentCommand>, I>>(base?: I): UpdateCommentCommand {
    return UpdateCommentCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCommentCommand>, I>>(object: I): UpdateCommentCommand {
    const message = createBaseUpdateCommentCommand();
    message.id = object.id ?? "";
    message.content = object.content ?? "";
    return message;
  },
};

function createBaseDeleteCommentCommand(): DeleteCommentCommand {
  return { id: "" };
}

export const DeleteCommentCommand = {
  encode(message: DeleteCommentCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteCommentCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteCommentCommand();
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

  fromJSON(object: any): DeleteCommentCommand {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeleteCommentCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteCommentCommand>, I>>(base?: I): DeleteCommentCommand {
    return DeleteCommentCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteCommentCommand>, I>>(object: I): DeleteCommentCommand {
    const message = createBaseDeleteCommentCommand();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseReactToCommentCommand(): ReactToCommentCommand {
  return { id: "", type: "" };
}

export const ReactToCommentCommand = {
  encode(message: ReactToCommentCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReactToCommentCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReactToCommentCommand();
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

          message.type = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReactToCommentCommand {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
    };
  },

  toJSON(message: ReactToCommentCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReactToCommentCommand>, I>>(base?: I): ReactToCommentCommand {
    return ReactToCommentCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReactToCommentCommand>, I>>(object: I): ReactToCommentCommand {
    const message = createBaseReactToCommentCommand();
    message.id = object.id ?? "";
    message.type = object.type ?? "";
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
