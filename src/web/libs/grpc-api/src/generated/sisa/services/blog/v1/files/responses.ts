/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";
import { ActorInfoResponse } from "../../../../libs/common/responses/actor_info_response";
import { PagingInfoResponse } from "../../../../libs/common/responses/paging_info_response";

export const protobufPackage = "sisa.blog.api.v1.files.responses";

export interface FileResponse {
  id: string;
  /** original file name */
  name: string;
  title: string | undefined;
  description: string | undefined;
  meta: { [key: string]: string };
  bucket: string;
  path: string;
  key: string;
  url: string;
  /** audit fields: from 63 to 70 */
  creator: ActorInfoResponse | undefined;
  updater: ActorInfoResponse | undefined;
}

export interface FileResponse_MetaEntry {
  key: string;
  value: string;
}

export interface SingleFileResponse {
  value: FileResponse | undefined;
}

export interface ListFilesResponse {
  value: FileResponse[];
  paging: PagingInfoResponse | undefined;
}

function createBaseFileResponse(): FileResponse {
  return {
    id: "",
    name: "",
    title: undefined,
    description: undefined,
    meta: {},
    bucket: "",
    path: "",
    key: "",
    url: "",
    creator: undefined,
    updater: undefined,
  };
}

export const FileResponse = {
  encode(message: FileResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
      FileResponse_MetaEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    if (message.bucket !== "") {
      writer.uint32(50).string(message.bucket);
    }
    if (message.path !== "") {
      writer.uint32(58).string(message.path);
    }
    if (message.key !== "") {
      writer.uint32(66).string(message.key);
    }
    if (message.url !== "") {
      writer.uint32(74).string(message.url);
    }
    if (message.creator !== undefined) {
      ActorInfoResponse.encode(message.creator, writer.uint32(490).fork()).ldelim();
    }
    if (message.updater !== undefined) {
      ActorInfoResponse.encode(message.updater, writer.uint32(498).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileResponse();
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

          const entry5 = FileResponse_MetaEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.meta[entry5.key] = entry5.value;
          }
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.bucket = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.path = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.key = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.url = reader.string();
          continue;
        case 61:
          if (tag !== 490) {
            break;
          }

          message.creator = ActorInfoResponse.decode(reader, reader.uint32());
          continue;
        case 62:
          if (tag !== 498) {
            break;
          }

          message.updater = ActorInfoResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FileResponse {
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
      bucket: isSet(object.bucket) ? globalThis.String(object.bucket) : "",
      path: isSet(object.path) ? globalThis.String(object.path) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      creator: isSet(object.creator) ? ActorInfoResponse.fromJSON(object.creator) : undefined,
      updater: isSet(object.updater) ? ActorInfoResponse.fromJSON(object.updater) : undefined,
    };
  },

  toJSON(message: FileResponse): unknown {
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
    if (message.bucket !== "") {
      obj.bucket = message.bucket;
    }
    if (message.path !== "") {
      obj.path = message.path;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.creator !== undefined) {
      obj.creator = ActorInfoResponse.toJSON(message.creator);
    }
    if (message.updater !== undefined) {
      obj.updater = ActorInfoResponse.toJSON(message.updater);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FileResponse>, I>>(base?: I): FileResponse {
    return FileResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FileResponse>, I>>(object: I): FileResponse {
    const message = createBaseFileResponse();
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
    message.bucket = object.bucket ?? "";
    message.path = object.path ?? "";
    message.key = object.key ?? "";
    message.url = object.url ?? "";
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? ActorInfoResponse.fromPartial(object.creator)
      : undefined;
    message.updater = (object.updater !== undefined && object.updater !== null)
      ? ActorInfoResponse.fromPartial(object.updater)
      : undefined;
    return message;
  },
};

function createBaseFileResponse_MetaEntry(): FileResponse_MetaEntry {
  return { key: "", value: "" };
}

export const FileResponse_MetaEntry = {
  encode(message: FileResponse_MetaEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileResponse_MetaEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileResponse_MetaEntry();
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

  fromJSON(object: any): FileResponse_MetaEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: FileResponse_MetaEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FileResponse_MetaEntry>, I>>(base?: I): FileResponse_MetaEntry {
    return FileResponse_MetaEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FileResponse_MetaEntry>, I>>(object: I): FileResponse_MetaEntry {
    const message = createBaseFileResponse_MetaEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseSingleFileResponse(): SingleFileResponse {
  return { value: undefined };
}

export const SingleFileResponse = {
  encode(message: SingleFileResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      FileResponse.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SingleFileResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleFileResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = FileResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SingleFileResponse {
    return { value: isSet(object.value) ? FileResponse.fromJSON(object.value) : undefined };
  },

  toJSON(message: SingleFileResponse): unknown {
    const obj: any = {};
    if (message.value !== undefined) {
      obj.value = FileResponse.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SingleFileResponse>, I>>(base?: I): SingleFileResponse {
    return SingleFileResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SingleFileResponse>, I>>(object: I): SingleFileResponse {
    const message = createBaseSingleFileResponse();
    message.value = (object.value !== undefined && object.value !== null)
      ? FileResponse.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseListFilesResponse(): ListFilesResponse {
  return { value: [], paging: undefined };
}

export const ListFilesResponse = {
  encode(message: ListFilesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.value) {
      FileResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingInfoResponse.encode(message.paging, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFilesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFilesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value.push(FileResponse.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.paging = PagingInfoResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListFilesResponse {
    return {
      value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => FileResponse.fromJSON(e)) : [],
      paging: isSet(object.paging) ? PagingInfoResponse.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: ListFilesResponse): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value.map((e) => FileResponse.toJSON(e));
    }
    if (message.paging !== undefined) {
      obj.paging = PagingInfoResponse.toJSON(message.paging);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListFilesResponse>, I>>(base?: I): ListFilesResponse {
    return ListFilesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListFilesResponse>, I>>(object: I): ListFilesResponse {
    const message = createBaseListFilesResponse();
    message.value = object.value?.map((e) => FileResponse.fromPartial(e)) || [];
    message.paging = (object.paging !== undefined && object.paging !== null)
      ? PagingInfoResponse.fromPartial(object.paging)
      : undefined;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
