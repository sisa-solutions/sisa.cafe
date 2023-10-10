/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";

export const protobufPackage = "sisa.blog.api.v1.files.commands";

export interface FileMetadata {
  /** original file name */
  name: string;
  /** file path */
  path: string;
  /** mime type */
  contentType: string;
  /** file size in bytes */
  size: number;
  title: string | undefined;
  description: string | undefined;
  tags: { [key: string]: string };
}

export interface FileMetadata_TagsEntry {
  key: string;
  value: string;
}

export interface UploadFileCommand {
  metadata?: FileMetadata | undefined;
  content?: Buffer | undefined;
}

export interface UpdateFileInfoCommand {
  id: string;
  title: string | undefined;
  description: string | undefined;
  tags: { [key: string]: string };
}

export interface UpdateFileInfoCommand_TagsEntry {
  key: string;
  value: string;
}

export interface DeleteFileCommand {
  id: string;
}

function createBaseFileMetadata(): FileMetadata {
  return { name: "", path: "", contentType: "", size: 0, title: undefined, description: undefined, tags: {} };
}

export const FileMetadata = {
  encode(message: FileMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.path !== "") {
      writer.uint32(26).string(message.path);
    }
    if (message.contentType !== "") {
      writer.uint32(34).string(message.contentType);
    }
    if (message.size !== 0) {
      writer.uint32(40).int64(message.size);
    }
    if (message.title !== undefined) {
      StringValue.encode({ value: message.title! }, writer.uint32(50).fork()).ldelim();
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(58).fork()).ldelim();
    }
    Object.entries(message.tags).forEach(([key, value]) => {
      FileMetadata_TagsEntry.encode({ key: key as any, value }, writer.uint32(66).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileMetadata();
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

          message.path = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.contentType = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.size = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.title = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          const entry8 = FileMetadata_TagsEntry.decode(reader, reader.uint32());
          if (entry8.value !== undefined) {
            message.tags[entry8.key] = entry8.value;
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

  fromJSON(object: any): FileMetadata {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      path: isSet(object.path) ? globalThis.String(object.path) : "",
      contentType: isSet(object.contentType) ? globalThis.String(object.contentType) : "",
      size: isSet(object.size) ? globalThis.Number(object.size) : 0,
      title: isSet(object.title) ? String(object.title) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      tags: isObject(object.tags)
        ? Object.entries(object.tags).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: FileMetadata): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.path !== "") {
      obj.path = message.path;
    }
    if (message.contentType !== "") {
      obj.contentType = message.contentType;
    }
    if (message.size !== 0) {
      obj.size = Math.round(message.size);
    }
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.tags) {
      const entries = Object.entries(message.tags);
      if (entries.length > 0) {
        obj.tags = {};
        entries.forEach(([k, v]) => {
          obj.tags[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FileMetadata>, I>>(base?: I): FileMetadata {
    return FileMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FileMetadata>, I>>(object: I): FileMetadata {
    const message = createBaseFileMetadata();
    message.name = object.name ?? "";
    message.path = object.path ?? "";
    message.contentType = object.contentType ?? "";
    message.size = object.size ?? 0;
    message.title = object.title ?? undefined;
    message.description = object.description ?? undefined;
    message.tags = Object.entries(object.tags ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseFileMetadata_TagsEntry(): FileMetadata_TagsEntry {
  return { key: "", value: "" };
}

export const FileMetadata_TagsEntry = {
  encode(message: FileMetadata_TagsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileMetadata_TagsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileMetadata_TagsEntry();
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

  fromJSON(object: any): FileMetadata_TagsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: FileMetadata_TagsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FileMetadata_TagsEntry>, I>>(base?: I): FileMetadata_TagsEntry {
    return FileMetadata_TagsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FileMetadata_TagsEntry>, I>>(object: I): FileMetadata_TagsEntry {
    const message = createBaseFileMetadata_TagsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseUploadFileCommand(): UploadFileCommand {
  return { metadata: undefined, content: undefined };
}

export const UploadFileCommand = {
  encode(message: UploadFileCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.metadata !== undefined) {
      FileMetadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.content !== undefined) {
      writer.uint32(18).bytes(message.content);
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

          message.metadata = FileMetadata.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = reader.bytes() as Buffer;
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
      metadata: isSet(object.metadata) ? FileMetadata.fromJSON(object.metadata) : undefined,
      content: isSet(object.content) ? Buffer.from(bytesFromBase64(object.content)) : undefined,
    };
  },

  toJSON(message: UploadFileCommand): unknown {
    const obj: any = {};
    if (message.metadata !== undefined) {
      obj.metadata = FileMetadata.toJSON(message.metadata);
    }
    if (message.content !== undefined) {
      obj.content = base64FromBytes(message.content);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadFileCommand>, I>>(base?: I): UploadFileCommand {
    return UploadFileCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UploadFileCommand>, I>>(object: I): UploadFileCommand {
    const message = createBaseUploadFileCommand();
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? FileMetadata.fromPartial(object.metadata)
      : undefined;
    message.content = object.content ?? undefined;
    return message;
  },
};

function createBaseUpdateFileInfoCommand(): UpdateFileInfoCommand {
  return { id: "", title: undefined, description: undefined, tags: {} };
}

export const UpdateFileInfoCommand = {
  encode(message: UpdateFileInfoCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== undefined) {
      StringValue.encode({ value: message.title! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(34).fork()).ldelim();
    }
    Object.entries(message.tags).forEach(([key, value]) => {
      UpdateFileInfoCommand_TagsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
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

          const entry5 = UpdateFileInfoCommand_TagsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.tags[entry5.key] = entry5.value;
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
      title: isSet(object.title) ? String(object.title) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      tags: isObject(object.tags)
        ? Object.entries(object.tags).reduce<{ [key: string]: string }>((acc, [key, value]) => {
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
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.tags) {
      const entries = Object.entries(message.tags);
      if (entries.length > 0) {
        obj.tags = {};
        entries.forEach(([k, v]) => {
          obj.tags[k] = v;
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
    message.title = object.title ?? undefined;
    message.description = object.description ?? undefined;
    message.tags = Object.entries(object.tags ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseUpdateFileInfoCommand_TagsEntry(): UpdateFileInfoCommand_TagsEntry {
  return { key: "", value: "" };
}

export const UpdateFileInfoCommand_TagsEntry = {
  encode(message: UpdateFileInfoCommand_TagsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateFileInfoCommand_TagsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateFileInfoCommand_TagsEntry();
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

  fromJSON(object: any): UpdateFileInfoCommand_TagsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: UpdateFileInfoCommand_TagsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateFileInfoCommand_TagsEntry>, I>>(base?: I): UpdateFileInfoCommand_TagsEntry {
    return UpdateFileInfoCommand_TagsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateFileInfoCommand_TagsEntry>, I>>(
    object: I,
  ): UpdateFileInfoCommand_TagsEntry {
    const message = createBaseUpdateFileInfoCommand_TagsEntry();
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
