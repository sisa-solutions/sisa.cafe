/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";

export const protobufPackage = "sisa.blog.api.v1.files.commands";

export interface UploadFileCommand {
  info?: UploadFileCommand_FileInfoParams | undefined;
  content?: UploadFileCommand_FileContentParams | undefined;
}

export interface UploadFileCommand_FileInfoParams {
  /** original file name */
  name: string;
  title: string | undefined;
  description: string | undefined;
  meta: { [key: string]: string };
}

export interface UploadFileCommand_FileInfoParams_MetaEntry {
  key: string;
  value: string;
}

export interface UploadFileCommand_FileContentParams {
  chunk: Buffer;
}

export interface UpdateFileInfoCommand {
  /** data fields: from 1 to 50 */
  id: string;
  /** original file name */
  name: string;
  title: string | undefined;
  description: string | undefined;
  meta: { [key: string]: string };
}

export interface UpdateFileInfoCommand_MetaEntry {
  key: string;
  value: string;
}

export interface DeleteFileCommand {
  id: string;
}

function createBaseUploadFileCommand(): UploadFileCommand {
  return { info: undefined, content: undefined };
}

export const UploadFileCommand = {
  encode(message: UploadFileCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.info !== undefined) {
      UploadFileCommand_FileInfoParams.encode(message.info, writer.uint32(10).fork()).ldelim();
    }
    if (message.content !== undefined) {
      UploadFileCommand_FileContentParams.encode(message.content, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadFileCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadFileCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.info = UploadFileCommand_FileInfoParams.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = UploadFileCommand_FileContentParams.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UploadFileCommand {
    return {
      info: isSet(object.info) ? UploadFileCommand_FileInfoParams.fromJSON(object.info) : undefined,
      content: isSet(object.content) ? UploadFileCommand_FileContentParams.fromJSON(object.content) : undefined,
    };
  },

  toJSON(message: UploadFileCommand): unknown {
    const obj: any = {};
    if (message.info !== undefined) {
      obj.info = UploadFileCommand_FileInfoParams.toJSON(message.info);
    }
    if (message.content !== undefined) {
      obj.content = UploadFileCommand_FileContentParams.toJSON(message.content);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadFileCommand>, I>>(base?: I): UploadFileCommand {
    return UploadFileCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UploadFileCommand>, I>>(object: I): UploadFileCommand {
    const message = createBaseUploadFileCommand();
    message.info = (object.info !== undefined && object.info !== null)
      ? UploadFileCommand_FileInfoParams.fromPartial(object.info)
      : undefined;
    message.content = (object.content !== undefined && object.content !== null)
      ? UploadFileCommand_FileContentParams.fromPartial(object.content)
      : undefined;
    return message;
  },
};

function createBaseUploadFileCommand_FileInfoParams(): UploadFileCommand_FileInfoParams {
  return { name: "", title: undefined, description: undefined, meta: {} };
}

export const UploadFileCommand_FileInfoParams = {
  encode(message: UploadFileCommand_FileInfoParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.title !== undefined) {
      StringValue.encode({ value: message.title! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(34).fork()).ldelim();
    }
    Object.entries(message.meta).forEach(([key, value]) => {
      UploadFileCommand_FileInfoParams_MetaEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadFileCommand_FileInfoParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadFileCommand_FileInfoParams();
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

          message.title = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = UploadFileCommand_FileInfoParams_MetaEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.meta[entry5.key] = entry5.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UploadFileCommand_FileInfoParams {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      title: isSet(object.title) ? String(object.title) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      meta: isObject(object.meta)
        ? Object.entries(object.meta).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: UploadFileCommand_FileInfoParams): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.meta) {
      const entries = Object.entries(message.meta);
      if (entries.length > 0) {
        obj.meta = {};
        entries.forEach(([k, v]) => {
          obj.meta[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadFileCommand_FileInfoParams>, I>>(
    base?: I,
  ): UploadFileCommand_FileInfoParams {
    return UploadFileCommand_FileInfoParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UploadFileCommand_FileInfoParams>, I>>(
    object: I,
  ): UploadFileCommand_FileInfoParams {
    const message = createBaseUploadFileCommand_FileInfoParams();
    message.name = object.name ?? "";
    message.title = object.title ?? undefined;
    message.description = object.description ?? undefined;
    message.meta = Object.entries(object.meta ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseUploadFileCommand_FileInfoParams_MetaEntry(): UploadFileCommand_FileInfoParams_MetaEntry {
  return { key: "", value: "" };
}

export const UploadFileCommand_FileInfoParams_MetaEntry = {
  encode(message: UploadFileCommand_FileInfoParams_MetaEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadFileCommand_FileInfoParams_MetaEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadFileCommand_FileInfoParams_MetaEntry();
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
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UploadFileCommand_FileInfoParams_MetaEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: UploadFileCommand_FileInfoParams_MetaEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadFileCommand_FileInfoParams_MetaEntry>, I>>(
    base?: I,
  ): UploadFileCommand_FileInfoParams_MetaEntry {
    return UploadFileCommand_FileInfoParams_MetaEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UploadFileCommand_FileInfoParams_MetaEntry>, I>>(
    object: I,
  ): UploadFileCommand_FileInfoParams_MetaEntry {
    const message = createBaseUploadFileCommand_FileInfoParams_MetaEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseUploadFileCommand_FileContentParams(): UploadFileCommand_FileContentParams {
  return { chunk: Buffer.alloc(0) };
}

export const UploadFileCommand_FileContentParams = {
  encode(message: UploadFileCommand_FileContentParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chunk.length !== 0) {
      writer.uint32(10).bytes(message.chunk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadFileCommand_FileContentParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadFileCommand_FileContentParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.chunk = reader.bytes() as Buffer;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UploadFileCommand_FileContentParams {
    return { chunk: isSet(object.chunk) ? Buffer.from(bytesFromBase64(object.chunk)) : Buffer.alloc(0) };
  },

  toJSON(message: UploadFileCommand_FileContentParams): unknown {
    const obj: any = {};
    if (message.chunk.length !== 0) {
      obj.chunk = base64FromBytes(message.chunk);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadFileCommand_FileContentParams>, I>>(
    base?: I,
  ): UploadFileCommand_FileContentParams {
    return UploadFileCommand_FileContentParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UploadFileCommand_FileContentParams>, I>>(
    object: I,
  ): UploadFileCommand_FileContentParams {
    const message = createBaseUploadFileCommand_FileContentParams();
    message.chunk = object.chunk ?? Buffer.alloc(0);
    return message;
  },
};

function createBaseUpdateFileInfoCommand(): UpdateFileInfoCommand {
  return { id: "", name: "", title: undefined, description: undefined, meta: {} };
}

export const UpdateFileInfoCommand = {
  encode(message: UpdateFileInfoCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.title !== undefined) {
      StringValue.encode({ value: message.title! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(34).fork()).ldelim();
    }
    Object.entries(message.meta).forEach(([key, value]) => {
      UpdateFileInfoCommand_MetaEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateFileInfoCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateFileInfoCommand();
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

          message.title = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = UpdateFileInfoCommand_MetaEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.meta[entry5.key] = entry5.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateFileInfoCommand {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      title: isSet(object.title) ? String(object.title) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      meta: isObject(object.meta)
        ? Object.entries(object.meta).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: UpdateFileInfoCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.meta) {
      const entries = Object.entries(message.meta);
      if (entries.length > 0) {
        obj.meta = {};
        entries.forEach(([k, v]) => {
          obj.meta[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateFileInfoCommand>, I>>(base?: I): UpdateFileInfoCommand {
    return UpdateFileInfoCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateFileInfoCommand>, I>>(object: I): UpdateFileInfoCommand {
    const message = createBaseUpdateFileInfoCommand();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.title = object.title ?? undefined;
    message.description = object.description ?? undefined;
    message.meta = Object.entries(object.meta ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseUpdateFileInfoCommand_MetaEntry(): UpdateFileInfoCommand_MetaEntry {
  return { key: "", value: "" };
}

export const UpdateFileInfoCommand_MetaEntry = {
  encode(message: UpdateFileInfoCommand_MetaEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateFileInfoCommand_MetaEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateFileInfoCommand_MetaEntry();
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
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateFileInfoCommand_MetaEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: UpdateFileInfoCommand_MetaEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateFileInfoCommand_MetaEntry>, I>>(base?: I): UpdateFileInfoCommand_MetaEntry {
    return UpdateFileInfoCommand_MetaEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateFileInfoCommand_MetaEntry>, I>>(
    object: I,
  ): UpdateFileInfoCommand_MetaEntry {
    const message = createBaseUpdateFileInfoCommand_MetaEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDeleteFileCommand(): DeleteFileCommand {
  return { id: "" };
}

export const DeleteFileCommand = {
  encode(message: DeleteFileCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteFileCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteFileCommand();
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

  fromJSON(object: any): DeleteFileCommand {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeleteFileCommand): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteFileCommand>, I>>(base?: I): DeleteFileCommand {
    return DeleteFileCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteFileCommand>, I>>(object: I): DeleteFileCommand {
    const message = createBaseDeleteFileCommand();
    message.id = object.id ?? "";
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

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
