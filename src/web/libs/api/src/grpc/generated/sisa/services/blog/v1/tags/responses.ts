/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";
import { ActorInfoResponse } from "../../../../libs/common/responses/actor_info_response";
import { PagingInfoResponse } from "../../../../libs/common/responses/paging_info_response";

export const protobufPackage = "sisa.blog.api.v1.tags.responses";

export interface TagInfoResponse {
  id: string;
  name: string;
  slug: string;
  description: string | undefined;
  postCount: number;
}

export interface TagResponse {
  /** data fields: from 1 to 50 */
  id: string;
  name: string;
  slug: string;
  description: string | undefined;
  postCount: number;
  /** audit fields: from 63 to 70 */
  creator: ActorInfoResponse | undefined;
  updater: ActorInfoResponse | undefined;
}

export interface SingleTagResponse {
  value: TagResponse | undefined;
}

export interface ListTagsResponse {
  value: TagResponse[];
  paging: PagingInfoResponse | undefined;
}

function createBaseTagInfoResponse(): TagInfoResponse {
  return { id: "", name: "", slug: "", description: undefined, postCount: 0 };
}

export const TagInfoResponse = {
  encode(message: TagInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
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
    if (message.postCount !== 0) {
      writer.uint32(40).int32(message.postCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TagInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTagInfoResponse();
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

          message.slug = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.postCount = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TagInfoResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      postCount: isSet(object.postCount) ? globalThis.Number(object.postCount) : 0,
    };
  },

  toJSON(message: TagInfoResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
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
    if (message.postCount !== 0) {
      obj.postCount = Math.round(message.postCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TagInfoResponse>, I>>(base?: I): TagInfoResponse {
    return TagInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TagInfoResponse>, I>>(object: I): TagInfoResponse {
    const message = createBaseTagInfoResponse();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? undefined;
    message.postCount = object.postCount ?? 0;
    return message;
  },
};

function createBaseTagResponse(): TagResponse {
  return { id: "", name: "", slug: "", description: undefined, postCount: 0, creator: undefined, updater: undefined };
}

export const TagResponse = {
  encode(message: TagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
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
    if (message.postCount !== 0) {
      writer.uint32(40).int32(message.postCount);
    }
    if (message.creator !== undefined) {
      ActorInfoResponse.encode(message.creator, writer.uint32(490).fork()).ldelim();
    }
    if (message.updater !== undefined) {
      ActorInfoResponse.encode(message.updater, writer.uint32(498).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TagResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTagResponse();
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

          message.slug = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.postCount = reader.int32();
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

  fromJSON(object: any): TagResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      postCount: isSet(object.postCount) ? globalThis.Number(object.postCount) : 0,
      creator: isSet(object.creator) ? ActorInfoResponse.fromJSON(object.creator) : undefined,
      updater: isSet(object.updater) ? ActorInfoResponse.fromJSON(object.updater) : undefined,
    };
  },

  toJSON(message: TagResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
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
    if (message.postCount !== 0) {
      obj.postCount = Math.round(message.postCount);
    }
    if (message.creator !== undefined) {
      obj.creator = ActorInfoResponse.toJSON(message.creator);
    }
    if (message.updater !== undefined) {
      obj.updater = ActorInfoResponse.toJSON(message.updater);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TagResponse>, I>>(base?: I): TagResponse {
    return TagResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TagResponse>, I>>(object: I): TagResponse {
    const message = createBaseTagResponse();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? undefined;
    message.postCount = object.postCount ?? 0;
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? ActorInfoResponse.fromPartial(object.creator)
      : undefined;
    message.updater = (object.updater !== undefined && object.updater !== null)
      ? ActorInfoResponse.fromPartial(object.updater)
      : undefined;
    return message;
  },
};

function createBaseSingleTagResponse(): SingleTagResponse {
  return { value: undefined };
}

export const SingleTagResponse = {
  encode(message: SingleTagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      TagResponse.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SingleTagResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleTagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = TagResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SingleTagResponse {
    return { value: isSet(object.value) ? TagResponse.fromJSON(object.value) : undefined };
  },

  toJSON(message: SingleTagResponse): unknown {
    const obj: any = {};
    if (message.value !== undefined) {
      obj.value = TagResponse.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SingleTagResponse>, I>>(base?: I): SingleTagResponse {
    return SingleTagResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SingleTagResponse>, I>>(object: I): SingleTagResponse {
    const message = createBaseSingleTagResponse();
    message.value = (object.value !== undefined && object.value !== null)
      ? TagResponse.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseListTagsResponse(): ListTagsResponse {
  return { value: [], paging: undefined };
}

export const ListTagsResponse = {
  encode(message: ListTagsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.value) {
      TagResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingInfoResponse.encode(message.paging, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTagsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTagsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value.push(TagResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListTagsResponse {
    return {
      value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => TagResponse.fromJSON(e)) : [],
      paging: isSet(object.paging) ? PagingInfoResponse.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: ListTagsResponse): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value.map((e) => TagResponse.toJSON(e));
    }
    if (message.paging !== undefined) {
      obj.paging = PagingInfoResponse.toJSON(message.paging);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListTagsResponse>, I>>(base?: I): ListTagsResponse {
    return ListTagsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListTagsResponse>, I>>(object: I): ListTagsResponse {
    const message = createBaseListTagsResponse();
    message.value = object.value?.map((e) => TagResponse.fromPartial(e)) || [];
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
