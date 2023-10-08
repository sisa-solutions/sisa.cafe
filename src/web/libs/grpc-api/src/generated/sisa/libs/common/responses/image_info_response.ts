/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ImageSize, imageSizeFromJSON, imageSizeToJSON } from "../enums/image_size";

export const protobufPackage = "sisa.common.responses";

export interface ImageInfoResponse {
  id: string;
  title: string;
  description: string;
  url: string;
  size: ImageSize;
}

function createBaseImageInfoResponse(): ImageInfoResponse {
  return { id: "", title: "", description: "", url: "", size: 0 };
}

export const ImageInfoResponse = {
  encode(message: ImageInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.url !== "") {
      writer.uint32(34).string(message.url);
    }
    if (message.size !== 0) {
      writer.uint32(40).int32(message.size);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageInfoResponse();
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

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.url = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.size = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImageInfoResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      size: isSet(object.size) ? imageSizeFromJSON(object.size) : 0,
    };
  },

  toJSON(message: ImageInfoResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.size !== 0) {
      obj.size = imageSizeToJSON(message.size);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ImageInfoResponse>, I>>(base?: I): ImageInfoResponse {
    return ImageInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ImageInfoResponse>, I>>(object: I): ImageInfoResponse {
    const message = createBaseImageInfoResponse();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.url = object.url ?? "";
    message.size = object.size ?? 0;
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
