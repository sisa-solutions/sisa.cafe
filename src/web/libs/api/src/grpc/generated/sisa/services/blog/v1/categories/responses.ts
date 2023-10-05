/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";
import { ActorInfoResponse } from "../../../../libs/common/responses/actor_info_response";
import { PagingInfoResponse } from "../../../../libs/common/responses/paging_info_response";

export const protobufPackage = "sisa.blog.api.v1.categories.responses";

export interface CategoryInfoResponse {
  id: string;
  name: string;
  slug: string;
  description: string | undefined;
}

export interface CategoryResponse {
  /** data fields: from 1 to 50 */
  id: string;
  name: string;
  slug: string;
  description:
    | string
    | undefined;
  /** relationship fields: from 51 to 60 */
  parent:
    | CategoryInfoResponse
    | undefined;
  /** audit fields: from 63 to 70 */
  creator: ActorInfoResponse | undefined;
  updater: ActorInfoResponse | undefined;
}

export interface SingleCategoryResponse {
  value: CategoryResponse | undefined;
}

export interface ListCategoriesResponse {
  value: CategoryResponse[];
  paging: PagingInfoResponse | undefined;
}

function createBaseCategoryInfoResponse(): CategoryInfoResponse {
  return { id: "", name: "", slug: "", description: undefined };
}

export const CategoryInfoResponse = {
  encode(message: CategoryInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CategoryInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoryInfoResponse();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CategoryInfoResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
    };
  },

  toJSON(message: CategoryInfoResponse): unknown {
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
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoryInfoResponse>, I>>(base?: I): CategoryInfoResponse {
    return CategoryInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CategoryInfoResponse>, I>>(object: I): CategoryInfoResponse {
    const message = createBaseCategoryInfoResponse();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? undefined;
    return message;
  },
};

function createBaseCategoryResponse(): CategoryResponse {
  return {
    id: "",
    name: "",
    slug: "",
    description: undefined,
    parent: undefined,
    creator: undefined,
    updater: undefined,
  };
}

export const CategoryResponse = {
  encode(message: CategoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.parent !== undefined) {
      CategoryInfoResponse.encode(message.parent, writer.uint32(410).fork()).ldelim();
    }
    if (message.creator !== undefined) {
      ActorInfoResponse.encode(message.creator, writer.uint32(490).fork()).ldelim();
    }
    if (message.updater !== undefined) {
      ActorInfoResponse.encode(message.updater, writer.uint32(498).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CategoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoryResponse();
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
        case 51:
          if (tag !== 410) {
            break;
          }

          message.parent = CategoryInfoResponse.decode(reader, reader.uint32());
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

  fromJSON(object: any): CategoryResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      parent: isSet(object.parent) ? CategoryInfoResponse.fromJSON(object.parent) : undefined,
      creator: isSet(object.creator) ? ActorInfoResponse.fromJSON(object.creator) : undefined,
      updater: isSet(object.updater) ? ActorInfoResponse.fromJSON(object.updater) : undefined,
    };
  },

  toJSON(message: CategoryResponse): unknown {
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
    if (message.parent !== undefined) {
      obj.parent = CategoryInfoResponse.toJSON(message.parent);
    }
    if (message.creator !== undefined) {
      obj.creator = ActorInfoResponse.toJSON(message.creator);
    }
    if (message.updater !== undefined) {
      obj.updater = ActorInfoResponse.toJSON(message.updater);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoryResponse>, I>>(base?: I): CategoryResponse {
    return CategoryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CategoryResponse>, I>>(object: I): CategoryResponse {
    const message = createBaseCategoryResponse();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? undefined;
    message.parent = (object.parent !== undefined && object.parent !== null)
      ? CategoryInfoResponse.fromPartial(object.parent)
      : undefined;
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? ActorInfoResponse.fromPartial(object.creator)
      : undefined;
    message.updater = (object.updater !== undefined && object.updater !== null)
      ? ActorInfoResponse.fromPartial(object.updater)
      : undefined;
    return message;
  },
};

function createBaseSingleCategoryResponse(): SingleCategoryResponse {
  return { value: undefined };
}

export const SingleCategoryResponse = {
  encode(message: SingleCategoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== undefined) {
      CategoryResponse.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SingleCategoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleCategoryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = CategoryResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SingleCategoryResponse {
    return { value: isSet(object.value) ? CategoryResponse.fromJSON(object.value) : undefined };
  },

  toJSON(message: SingleCategoryResponse): unknown {
    const obj: any = {};
    if (message.value !== undefined) {
      obj.value = CategoryResponse.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SingleCategoryResponse>, I>>(base?: I): SingleCategoryResponse {
    return SingleCategoryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SingleCategoryResponse>, I>>(object: I): SingleCategoryResponse {
    const message = createBaseSingleCategoryResponse();
    message.value = (object.value !== undefined && object.value !== null)
      ? CategoryResponse.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseListCategoriesResponse(): ListCategoriesResponse {
  return { value: [], paging: undefined };
}

export const ListCategoriesResponse = {
  encode(message: ListCategoriesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.value) {
      CategoryResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.paging !== undefined) {
      PagingInfoResponse.encode(message.paging, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCategoriesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCategoriesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value.push(CategoryResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListCategoriesResponse {
    return {
      value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => CategoryResponse.fromJSON(e)) : [],
      paging: isSet(object.paging) ? PagingInfoResponse.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: ListCategoriesResponse): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value.map((e) => CategoryResponse.toJSON(e));
    }
    if (message.paging !== undefined) {
      obj.paging = PagingInfoResponse.toJSON(message.paging);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListCategoriesResponse>, I>>(base?: I): ListCategoriesResponse {
    return ListCategoriesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListCategoriesResponse>, I>>(object: I): ListCategoriesResponse {
    const message = createBaseListCategoriesResponse();
    message.value = object.value?.map((e) => CategoryResponse.fromPartial(e)) || [];
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
