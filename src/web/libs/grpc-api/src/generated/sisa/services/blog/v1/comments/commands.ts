/* eslint-disable */
import _m0 from "protobufjs/minimal";

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
};
