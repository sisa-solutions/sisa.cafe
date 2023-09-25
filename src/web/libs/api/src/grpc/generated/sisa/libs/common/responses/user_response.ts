/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "sisa.common";

export interface UserResponse {
  id: string;
  userName: string;
  displayName: string;
  picture: string;
  status: string;
}

export interface CreatorResponse {
  id: string;
  userName: string;
  displayName: string;
  picture: string;
  status: string;
}

function createBaseUserResponse(): UserResponse {
  return { id: "", userName: "", displayName: "", picture: "", status: "" };
}

export const UserResponse = {
  encode(message: UserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userName !== "") {
      writer.uint32(18).string(message.userName);
    }
    if (message.displayName !== "") {
      writer.uint32(26).string(message.displayName);
    }
    if (message.picture !== "") {
      writer.uint32(34).string(message.picture);
    }
    if (message.status !== "") {
      writer.uint32(50).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserResponse();
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

          message.userName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.picture = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      userName: isSet(object.userName) ? String(object.userName) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      picture: isSet(object.picture) ? String(object.picture) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: UserResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.picture !== "") {
      obj.picture = message.picture;
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserResponse>, I>>(base?: I): UserResponse {
    return UserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserResponse>, I>>(object: I): UserResponse {
    const message = createBaseUserResponse();
    message.id = object.id ?? "";
    message.userName = object.userName ?? "";
    message.displayName = object.displayName ?? "";
    message.picture = object.picture ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseCreatorResponse(): CreatorResponse {
  return { id: "", userName: "", displayName: "", picture: "", status: "" };
}

export const CreatorResponse = {
  encode(message: CreatorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userName !== "") {
      writer.uint32(18).string(message.userName);
    }
    if (message.displayName !== "") {
      writer.uint32(26).string(message.displayName);
    }
    if (message.picture !== "") {
      writer.uint32(34).string(message.picture);
    }
    if (message.status !== "") {
      writer.uint32(50).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatorResponse();
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

          message.userName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.picture = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreatorResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      userName: isSet(object.userName) ? String(object.userName) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      picture: isSet(object.picture) ? String(object.picture) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: CreatorResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.picture !== "") {
      obj.picture = message.picture;
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreatorResponse>, I>>(base?: I): CreatorResponse {
    return CreatorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreatorResponse>, I>>(object: I): CreatorResponse {
    const message = createBaseCreatorResponse();
    message.id = object.id ?? "";
    message.userName = object.userName ?? "";
    message.displayName = object.displayName ?? "";
    message.picture = object.picture ?? "";
    message.status = object.status ?? "";
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
