/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";

export const protobufPackage = "sisa.blog.api.v1.tags.commands";

export interface CreateTagCommand {
  /** data fields: from 1 to 50 */
  name: string;
  slug: string;
  description:
    | string
    | undefined;
  /** relationship fields: from 51 to 60 */
  parentId: string | undefined;
}

export interface UpdateTagCommand {
  /** data fields: from 1 to 50 */
  id: string;
  name: string;
  slug: string;
  description: string | undefined;
}

export interface DeleteTagCommand {
  id: string;
}

function createBaseCreateTagCommand(): CreateTagCommand {
  return { name: "", slug: "", description: undefined, parentId: undefined };
}

export const CreateTagCommand = {
  encode(message: CreateTagCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.slug !== "") {
      writer.uint32(26).string(message.slug);
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.parentId !== undefined) {
      StringValue.encode({ value: message.parentId! }, writer.uint32(410).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTagCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTagCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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
        case 51:
          if (tag !== 410) {
            break;
          }

          message.parentId = StringValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateTagCommand {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      parentId: isSet(object.parentId) ? String(object.parentId) : undefined,
    };
  },

  toJSON(message: CreateTagCommand): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.parentId !== undefined) {
      obj.parentId = message.parentId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateTagCommand>, I>>(base?: I): CreateTagCommand {
    return CreateTagCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateTagCommand>, I>>(object: I): CreateTagCommand {
    const message = createBaseCreateTagCommand();
    message.name = object.name ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? undefined;
    message.parentId = object.parentId ?? undefined;
    return message;
  },
};

function createBaseUpdateTagCommand(): UpdateTagCommand {
  return { id: "", name: "", slug: "", description: undefined };
}

export const UpdateTagCommand = {
  encode(message: UpdateTagCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTagCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateTagCommand();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateTagCommand {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
    };
  },

  toJSON(message: UpdateTagCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateTagCommand>, I>>(base?: I): UpdateTagCommand {
    return UpdateTagCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateTagCommand>, I>>(object: I): UpdateTagCommand {
    const message = createBaseUpdateTagCommand();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? undefined;
    return message;
  },
};

function createBaseDeleteTagCommand(): DeleteTagCommand {
  return { id: "" };
}

export const DeleteTagCommand = {
  encode(message: DeleteTagCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTagCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteTagCommand();
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

  fromJSON(object: any): DeleteTagCommand {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeleteTagCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteTagCommand>, I>>(base?: I): DeleteTagCommand {
    return DeleteTagCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteTagCommand>, I>>(object: I): DeleteTagCommand {
    const message = createBaseDeleteTagCommand();
    message.id = object.id ?? "";
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
