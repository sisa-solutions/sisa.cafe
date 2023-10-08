/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../../google/protobuf/timestamp";

export const protobufPackage = "sisa.common.responses";

export interface ActorInfoResponse {
  id: string;
  userName: string;
  displayName: string;
  timestamp: Date | undefined;
}

function createBaseActorInfoResponse(): ActorInfoResponse {
  return { id: "", userName: "", displayName: "", timestamp: undefined };
}

export const ActorInfoResponse = {
  encode(message: ActorInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userName !== "") {
      writer.uint32(18).string(message.userName);
    }
    if (message.displayName !== "") {
      writer.uint32(26).string(message.displayName);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActorInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActorInfoResponse();
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
        case 10:
          if (tag !== 82) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActorInfoResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      userName: isSet(object.userName) ? globalThis.String(object.userName) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: ActorInfoResponse): unknown {
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
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActorInfoResponse>, I>>(base?: I): ActorInfoResponse {
    return ActorInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActorInfoResponse>, I>>(object: I): ActorInfoResponse {
    const message = createBaseActorInfoResponse();
    message.id = object.id ?? "";
    message.userName = object.userName ?? "";
    message.displayName = object.displayName ?? "";
    message.timestamp = object.timestamp ?? undefined;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
