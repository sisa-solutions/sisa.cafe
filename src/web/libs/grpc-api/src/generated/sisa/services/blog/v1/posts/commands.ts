/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";

export const protobufPackage = "sisa.blog.api.v1.posts.commands";

export interface CreatePostCommand {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  /** this is dedicated field in post, not a relationship, so it's not reversed */
  tags: string[];
  categoryId: string | undefined;
}

export interface UpdatePostCommand {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
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
  return { title: "", slug: "", excerpt: "", content: "", tags: [], categoryId: undefined };
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
    for (const v of message.tags) {
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

          message.tags.push(reader.string());
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

  fromJSON(object: any): CreatePostCommand {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      excerpt: isSet(object.excerpt) ? globalThis.String(object.excerpt) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      tags: globalThis.Array.isArray(object?.tags) ? object.tags.map((e: any) => globalThis.String(e)) : [],
      categoryId: isSet(object.categoryId) ? String(object.categoryId) : undefined,
    };
  },

  toJSON(message: CreatePostCommand): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    if (message.excerpt !== "") {
      obj.excerpt = message.excerpt;
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.tags?.length) {
      obj.tags = message.tags;
    }
    if (message.categoryId !== undefined) {
      obj.categoryId = message.categoryId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreatePostCommand>, I>>(base?: I): CreatePostCommand {
    return CreatePostCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreatePostCommand>, I>>(object: I): CreatePostCommand {
    const message = createBaseCreatePostCommand();
    message.title = object.title ?? "";
    message.slug = object.slug ?? "";
    message.excerpt = object.excerpt ?? "";
    message.content = object.content ?? "";
    message.tags = object.tags?.map((e) => e) || [];
    message.categoryId = object.categoryId ?? undefined;
    return message;
  },
};

function createBaseUpdatePostCommand(): UpdatePostCommand {
  return { id: "", title: "", slug: "", excerpt: "", content: "", tags: [], categoryId: undefined };
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
    for (const v of message.tags) {
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

          message.tags.push(reader.string());
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

  fromJSON(object: any): UpdatePostCommand {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      excerpt: isSet(object.excerpt) ? globalThis.String(object.excerpt) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      tags: globalThis.Array.isArray(object?.tags) ? object.tags.map((e: any) => globalThis.String(e)) : [],
      categoryId: isSet(object.categoryId) ? String(object.categoryId) : undefined,
    };
  },

  toJSON(message: UpdatePostCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    if (message.excerpt !== "") {
      obj.excerpt = message.excerpt;
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.tags?.length) {
      obj.tags = message.tags;
    }
    if (message.categoryId !== undefined) {
      obj.categoryId = message.categoryId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdatePostCommand>, I>>(base?: I): UpdatePostCommand {
    return UpdatePostCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdatePostCommand>, I>>(object: I): UpdatePostCommand {
    const message = createBaseUpdatePostCommand();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.slug = object.slug ?? "";
    message.excerpt = object.excerpt ?? "";
    message.content = object.content ?? "";
    message.tags = object.tags?.map((e) => e) || [];
    message.categoryId = object.categoryId ?? undefined;
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

  fromJSON(object: any): PublishPostCommand {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      remark: isSet(object.remark) ? globalThis.String(object.remark) : "",
    };
  },

  toJSON(message: PublishPostCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.remark !== "") {
      obj.remark = message.remark;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishPostCommand>, I>>(base?: I): PublishPostCommand {
    return PublishPostCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublishPostCommand>, I>>(object: I): PublishPostCommand {
    const message = createBasePublishPostCommand();
    message.id = object.id ?? "";
    message.remark = object.remark ?? "";
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

  fromJSON(object: any): DeletePostCommand {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeletePostCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeletePostCommand>, I>>(base?: I): DeletePostCommand {
    return DeletePostCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeletePostCommand>, I>>(object: I): DeletePostCommand {
    const message = createBaseDeletePostCommand();
    message.id = object.id ?? "";
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

  fromJSON(object: any): CreateCommentCommand {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
    };
  },

  toJSON(message: CreateCommentCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCommentCommand>, I>>(base?: I): CreateCommentCommand {
    return CreateCommentCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCommentCommand>, I>>(object: I): CreateCommentCommand {
    const message = createBaseCreateCommentCommand();
    message.id = object.id ?? "";
    message.content = object.content ?? "";
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

  fromJSON(object: any): ReactToPostCommand {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
    };
  },

  toJSON(message: ReactToPostCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReactToPostCommand>, I>>(base?: I): ReactToPostCommand {
    return ReactToPostCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReactToPostCommand>, I>>(object: I): ReactToPostCommand {
    const message = createBaseReactToPostCommand();
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
