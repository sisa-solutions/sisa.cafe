/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "sisa.blog.api";

export interface CreatePostCommand {
  categoryId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface UpdatePostCommand {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface PublishPostCommand {
  id: string;
  remark: string;
}

export interface DeletePostCommand {
  id: string;
}

function createBaseCreatePostCommand(): CreatePostCommand {
  return { categoryId: "", title: "", slug: "", excerpt: "", content: "", tags: [] };
}

export const CreatePostCommand = {
  encode(message: CreatePostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.categoryId !== "") {
      writer.uint32(10).string(message.categoryId);
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatePostCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePostCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.categoryId = reader.string();
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
      categoryId: isSet(object.categoryId) ? String(object.categoryId) : "",
      title: isSet(object.title) ? String(object.title) : "",
      slug: isSet(object.slug) ? String(object.slug) : "",
      excerpt: isSet(object.excerpt) ? String(object.excerpt) : "",
      content: isSet(object.content) ? String(object.content) : "",
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: CreatePostCommand): unknown {
    const obj: any = {};
    if (message.categoryId !== "") {
      obj.categoryId = message.categoryId;
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
    return obj;
  },

  create<I extends Exact<DeepPartial<CreatePostCommand>, I>>(base?: I): CreatePostCommand {
    return CreatePostCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreatePostCommand>, I>>(object: I): CreatePostCommand {
    const message = createBaseCreatePostCommand();
    message.categoryId = object.categoryId ?? "";
    message.title = object.title ?? "";
    message.slug = object.slug ?? "";
    message.excerpt = object.excerpt ?? "";
    message.content = object.content ?? "";
    message.tags = object.tags?.map((e) => e) || [];
    return message;
  },
};

function createBaseUpdatePostCommand(): UpdatePostCommand {
  return { id: "", categoryId: "", title: "", slug: "", excerpt: "", content: "", tags: [] };
}

export const UpdatePostCommand = {
  encode(message: UpdatePostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.categoryId !== "") {
      writer.uint32(18).string(message.categoryId);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.slug !== "") {
      writer.uint32(34).string(message.slug);
    }
    if (message.excerpt !== "") {
      writer.uint32(42).string(message.excerpt);
    }
    if (message.content !== "") {
      writer.uint32(50).string(message.content);
    }
    for (const v of message.tags) {
      writer.uint32(58).string(v!);
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

          message.categoryId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.title = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.excerpt = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.content = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.tags.push(reader.string());
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
      id: isSet(object.id) ? String(object.id) : "",
      categoryId: isSet(object.categoryId) ? String(object.categoryId) : "",
      title: isSet(object.title) ? String(object.title) : "",
      slug: isSet(object.slug) ? String(object.slug) : "",
      excerpt: isSet(object.excerpt) ? String(object.excerpt) : "",
      content: isSet(object.content) ? String(object.content) : "",
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: UpdatePostCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.categoryId !== "") {
      obj.categoryId = message.categoryId;
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
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdatePostCommand>, I>>(base?: I): UpdatePostCommand {
    return UpdatePostCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdatePostCommand>, I>>(object: I): UpdatePostCommand {
    const message = createBaseUpdatePostCommand();
    message.id = object.id ?? "";
    message.categoryId = object.categoryId ?? "";
    message.title = object.title ?? "";
    message.slug = object.slug ?? "";
    message.excerpt = object.excerpt ?? "";
    message.content = object.content ?? "";
    message.tags = object.tags?.map((e) => e) || [];
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
    return { id: isSet(object.id) ? String(object.id) : "", remark: isSet(object.remark) ? String(object.remark) : "" };
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
    return { id: isSet(object.id) ? String(object.id) : "" };
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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
