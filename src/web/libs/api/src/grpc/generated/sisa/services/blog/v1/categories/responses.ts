/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StringValue } from "../../../../../google/protobuf/wrappers";
import { PagingResponse } from "../../../../libs/common/responses/paging_response";

export const protobufPackage = "sisa.blog.api";

export interface ParentCategoryResponse {
  id: string;
  name: string;
}

export interface CategoryResponse {
  id: string;
  parentId: string | undefined;
  name: string;
  slug: string;
  description: string | undefined;
  parent: ParentCategoryResponse | undefined;
}

export interface SingleCategoryResponse {
  value: CategoryResponse | undefined;
}

export interface ListCategoriesResponse {
  value: CategoryResponse[];
  paging: PagingResponse | undefined;
}

function createBaseParentCategoryResponse(): ParentCategoryResponse {
  return { id: "", name: "" };
}

export const ParentCategoryResponse = {
  encode(message: ParentCategoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParentCategoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParentCategoryResponse();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ParentCategoryResponse {
    return { id: isSet(object.id) ? String(object.id) : "", name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: ParentCategoryResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ParentCategoryResponse>, I>>(base?: I): ParentCategoryResponse {
    return ParentCategoryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ParentCategoryResponse>, I>>(object: I): ParentCategoryResponse {
    const message = createBaseParentCategoryResponse();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseCategoryResponse(): CategoryResponse {
  return { id: "", parentId: undefined, name: "", slug: "", description: undefined, parent: undefined };
}

export const CategoryResponse = {
  encode(message: CategoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.parentId !== undefined) {
      StringValue.encode({ value: message.parentId! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.slug !== "") {
      writer.uint32(34).string(message.slug);
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.parent !== undefined) {
      ParentCategoryResponse.encode(message.parent, writer.uint32(50).fork()).ldelim();
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

          message.parentId = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.parent = ParentCategoryResponse.decode(reader, reader.uint32());
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
      id: isSet(object.id) ? String(object.id) : "",
      parentId: isSet(object.parentId) ? String(object.parentId) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      slug: isSet(object.slug) ? String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      parent: isSet(object.parent) ? ParentCategoryResponse.fromJSON(object.parent) : undefined,
    };
  },

  toJSON(message: CategoryResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.parentId !== undefined) {
      obj.parentId = message.parentId;
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
      obj.parent = ParentCategoryResponse.toJSON(message.parent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoryResponse>, I>>(base?: I): CategoryResponse {
    return CategoryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CategoryResponse>, I>>(object: I): CategoryResponse {
    const message = createBaseCategoryResponse();
    message.id = object.id ?? "";
    message.parentId = object.parentId ?? undefined;
    message.name = object.name ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? undefined;
    message.parent = (object.parent !== undefined && object.parent !== null)
      ? ParentCategoryResponse.fromPartial(object.parent)
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
      PagingResponse.encode(message.paging, writer.uint32(18).fork()).ldelim();
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

          message.paging = PagingResponse.decode(reader, reader.uint32());
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
      value: Array.isArray(object?.value) ? object.value.map((e: any) => CategoryResponse.fromJSON(e)) : [],
      paging: isSet(object.paging) ? PagingResponse.fromJSON(object.paging) : undefined,
    };
  },

  toJSON(message: ListCategoriesResponse): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value.map((e) => CategoryResponse.toJSON(e));
    }
    if (message.paging !== undefined) {
      obj.paging = PagingResponse.toJSON(message.paging);
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
      ? PagingResponse.fromPartial(object.paging)
      : undefined;
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
