/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";

export const protobufPackage = "sisa.blog.api";

export interface CreateCategoryCommand {
  parentId: string | undefined;
  name: string;
  slug: string;
  description: string | undefined;
}

export interface UpdateCategoryCommand {
  id: string;
  parentId: string | undefined;
  name: string;
  slug: string;
  description: string | undefined;
}

export interface DeleteCategoryCommand {
  id: string;
}

function createBaseCreateCategoryCommand(): CreateCategoryCommand {
  return { parentId: undefined, name: "", slug: "", description: undefined };
}

export const CreateCategoryCommand = {
  encode(message: CreateCategoryCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parentId !== undefined) {
      StringValue.encode({ value: message.parentId! }, writer.uint32(10).fork()).ldelim();
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

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCategoryCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCategoryCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parentId = StringValue.decode(reader, reader.uint32()).value;
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

  fromJSON(object: any): CreateCategoryCommand {
    return {
      parentId: isSet(object.parentId) ? String(object.parentId) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      slug: isSet(object.slug) ? String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
    };
  },

  toJSON(message: CreateCategoryCommand): unknown {
    const obj: any = {};
    if (message.parentId !== undefined) {
      obj.parentId = message.parentId;
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

  create<I extends Exact<DeepPartial<CreateCategoryCommand>, I>>(base?: I): CreateCategoryCommand {
    return CreateCategoryCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCategoryCommand>, I>>(object: I): CreateCategoryCommand {
    const message = createBaseCreateCategoryCommand();
    message.parentId = object.parentId ?? undefined;
    message.name = object.name ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? undefined;
    return message;
  },
};

function createBaseUpdateCategoryCommand(): UpdateCategoryCommand {
  return { id: "", parentId: undefined, name: "", slug: "", description: undefined };
}

export const UpdateCategoryCommand = {
  encode(message: UpdateCategoryCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.parentId !== undefined) {
      StringValue.encode({ value: message.parentId! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.slug !== "") {
      writer.uint32(34).string(message.slug);
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCategoryCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCategoryCommand();
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

          message.parentId = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
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

  fromJSON(object: any): UpdateCategoryCommand {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      parentId: isSet(object.parentId) ? String(object.parentId) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      slug: isSet(object.slug) ? String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
    };
  },

  toJSON(message: UpdateCategoryCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.parentId !== undefined) {
      obj.parentId = message.parentId;
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

  create<I extends Exact<DeepPartial<UpdateCategoryCommand>, I>>(base?: I): UpdateCategoryCommand {
    return UpdateCategoryCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCategoryCommand>, I>>(object: I): UpdateCategoryCommand {
    const message = createBaseUpdateCategoryCommand();
    message.id = object.id ?? "";
    message.parentId = object.parentId ?? undefined;
    message.name = object.name ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? undefined;
    return message;
  },
};

function createBaseDeleteCategoryCommand(): DeleteCategoryCommand {
  return { id: "" };
}

export const DeleteCategoryCommand = {
  encode(message: DeleteCategoryCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteCategoryCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteCategoryCommand();
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

  fromJSON(object: any): DeleteCategoryCommand {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: DeleteCategoryCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteCategoryCommand>, I>>(base?: I): DeleteCategoryCommand {
    return DeleteCategoryCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteCategoryCommand>, I>>(object: I): DeleteCategoryCommand {
    const message = createBaseDeleteCategoryCommand();
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
