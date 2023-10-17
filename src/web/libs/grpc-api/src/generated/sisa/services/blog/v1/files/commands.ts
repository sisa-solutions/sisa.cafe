/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";

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
};

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
