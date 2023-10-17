/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";

export interface CreatePostCommand {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  /** this is dedicated field in post, not a relationship, so it's not reversed */
  tagSlugs: string[];
  categoryId: string | undefined;
}

export interface UpdatePostCommand {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tagSlugs: string[];
  categoryId: string | undefined;
}

export interface PublishPostCommand {
  id: string;
  remark: string;
}

export interface DeletePostCommand {
  id: string;
}

export interface CreateCommentCommand {
  /** data fields: from 1 to 50 */
  id: string;
  content: string;
}

export interface ReactToPostCommand {
  /** data fields: from 1 to 50 */
  id: string;
  type: string;
}

function createBaseCreatePostCommand(): CreatePostCommand {
  return { title: "", slug: "", excerpt: "", content: "", tagSlugs: [], categoryId: undefined };
}

export const CreatePostCommand = {
  encode(message: CreatePostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.slug !== "") {
      writer.uint32(26).string(message.slug);
    }
    if (message.excerpt !== "") {
      writer.uint32(34).string(message.excerpt);
    }
    if (message.content !== "") {
      writer.uint32(42).string(message.content);
    }
    for (const v of message.tagSlugs) {
      writer.uint32(50).string(v!);
    }
    if (message.categoryId !== undefined) {
      StringValue.encode({ value: message.categoryId! }, writer.uint32(410).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatePostCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePostCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.title = reader.string();
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

          message.excerpt = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.content = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.tagSlugs.push(reader.string());
          continue;
        case 51:
          if (tag !== 410) {
            break;
          }

          message.categoryId = StringValue.decode(reader, reader.uint32()).value;
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

function createBaseUpdatePostCommand(): UpdatePostCommand {
  return { id: "", title: "", slug: "", excerpt: "", content: "", tagSlugs: [], categoryId: undefined };
}

export const UpdatePostCommand = {
  encode(message: UpdatePostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.slug !== "") {
      writer.uint32(26).string(message.slug);
    }
    if (message.excerpt !== "") {
      writer.uint32(34).string(message.excerpt);
    }
    if (message.content !== "") {
      writer.uint32(42).string(message.content);
    }
    for (const v of message.tagSlugs) {
      writer.uint32(50).string(v!);
    }
    if (message.categoryId !== undefined) {
      StringValue.encode({ value: message.categoryId! }, writer.uint32(410).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePostCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePostCommand();
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

          message.title = reader.string();
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

          message.excerpt = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.content = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.tagSlugs.push(reader.string());
          continue;
        case 51:
          if (tag !== 410) {
            break;
          }

          message.categoryId = StringValue.decode(reader, reader.uint32()).value;
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

function createBasePublishPostCommand(): PublishPostCommand {
  return { id: "", remark: "" };
}

export const PublishPostCommand = {
  encode(message: PublishPostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.remark !== "") {
      writer.uint32(26).string(message.remark);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishPostCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishPostCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.remark = reader.string();
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

function createBaseDeletePostCommand(): DeletePostCommand {
  return { id: "" };
}

export const DeletePostCommand = {
  encode(message: DeletePostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeletePostCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeletePostCommand();
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

function createBaseCreateCommentCommand(): CreateCommentCommand {
  return { id: "", content: "" };
}

export const CreateCommentCommand = {
  encode(message: CreateCommentCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCommentCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCommentCommand();
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

function createBaseReactToPostCommand(): ReactToPostCommand {
  return { id: "", type: "" };
}

export const ReactToPostCommand = {
  encode(message: ReactToPostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReactToPostCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReactToPostCommand();
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
