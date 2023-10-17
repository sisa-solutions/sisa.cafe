/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";
import { ActorInfoResponse } from "../../../../libs/common/responses/actor_info_response";
import { PagingInfoResponse } from "../../../../libs/common/responses/paging_info_response";

export interface FileResponse {
  id: string;
  /** original file name */
  originalName: string;
  bucket: string;
  path: string;
  name: string;
  size: number;
  extension: string | undefined;
  mimeType: string | undefined;
  title: string | undefined;
  description: string | undefined;
  tags: { [key: string]: string };
  url: string;
  /** audit fields: from 63 to 70 */
  creator: ActorInfoResponse | undefined;
  updater: ActorInfoResponse | undefined;
}

export interface FileResponse_TagsEntry {
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
    originalName: "",
    bucket: "",
    path: "",
    name: "",
    size: 0,
    extension: undefined,
    mimeType: undefined,
    title: undefined,
    description: undefined,
    tags: {},
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
    if (message.originalName !== "") {
      writer.uint32(18).string(message.originalName);
    }
    if (message.bucket !== "") {
      writer.uint32(26).string(message.bucket);
    }
    if (message.path !== "") {
      writer.uint32(34).string(message.path);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.size !== 0) {
      writer.uint32(48).int32(message.size);
    }
    if (message.extension !== undefined) {
      StringValue.encode({ value: message.extension! }, writer.uint32(58).fork()).ldelim();
    }
    if (message.mimeType !== undefined) {
      StringValue.encode({ value: message.mimeType! }, writer.uint32(66).fork()).ldelim();
    }
    if (message.title !== undefined) {
      StringValue.encode({ value: message.title! }, writer.uint32(74).fork()).ldelim();
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(82).fork()).ldelim();
    }
    Object.entries(message.tags).forEach(([key, value]) => {
      FileResponse_TagsEntry.encode({ key: key as any, value }, writer.uint32(90).fork()).ldelim();
    });
    if (message.url !== "") {
      writer.uint32(98).string(message.url);
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

          message.originalName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bucket = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.path = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.name = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.size = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.extension = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.mimeType = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.title = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          const entry11 = FileResponse_TagsEntry.decode(reader, reader.uint32());
          if (entry11.value !== undefined) {
            message.tags[entry11.key] = entry11.value;
          }
          continue;
        case 12:
          if (tag !== 98) {
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
};

function createBaseFileResponse_TagsEntry(): FileResponse_TagsEntry {
  return { key: "", value: "" };
}

export const FileResponse_TagsEntry = {
  encode(message: FileResponse_TagsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileResponse_TagsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileResponse_TagsEntry();
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
};
