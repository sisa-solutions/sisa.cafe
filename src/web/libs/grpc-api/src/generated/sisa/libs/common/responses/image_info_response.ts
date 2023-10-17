/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ImageSize } from "../enums/image_size";

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
};
