/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import { Empty } from "../../../../../google/protobuf/empty";
import { CreateCategoryCommand, DeleteCategoryCommand, UpdateCategoryCommand } from "./commands";
import { FindCategoryByIdQuery, FindCategoryBySlugQuery, GetCategoriesQuery } from "./queries";
import { ListCategoriesResponse, SingleCategoryResponse } from "./responses";

export const protobufPackage = "sisa.blog.api.v1.categories";

export type CategoryGrpcServiceService = typeof CategoryGrpcServiceService;
export const CategoryGrpcServiceService = {
  getCategories: {
    path: "/sisa.blog.api.v1.categories.CategoryGrpcService/GetCategories",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetCategoriesQuery) => Buffer.from(GetCategoriesQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetCategoriesQuery.decode(value),
    responseSerialize: (value: ListCategoriesResponse) => Buffer.from(ListCategoriesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListCategoriesResponse.decode(value),
  },
  findCategoryById: {
    path: "/sisa.blog.api.v1.categories.CategoryGrpcService/FindCategoryById",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindCategoryByIdQuery) => Buffer.from(FindCategoryByIdQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindCategoryByIdQuery.decode(value),
    responseSerialize: (value: SingleCategoryResponse) => Buffer.from(SingleCategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleCategoryResponse.decode(value),
  },
  findCategoryBySlug: {
    path: "/sisa.blog.api.v1.categories.CategoryGrpcService/FindCategoryBySlug",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindCategoryBySlugQuery) => Buffer.from(FindCategoryBySlugQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindCategoryBySlugQuery.decode(value),
    responseSerialize: (value: SingleCategoryResponse) => Buffer.from(SingleCategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleCategoryResponse.decode(value),
  },
  createCategory: {
    path: "/sisa.blog.api.v1.categories.CategoryGrpcService/CreateCategory",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateCategoryCommand) => Buffer.from(CreateCategoryCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateCategoryCommand.decode(value),
    responseSerialize: (value: SingleCategoryResponse) => Buffer.from(SingleCategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleCategoryResponse.decode(value),
  },
  updateCategory: {
    path: "/sisa.blog.api.v1.categories.CategoryGrpcService/UpdateCategory",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateCategoryCommand) => Buffer.from(UpdateCategoryCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateCategoryCommand.decode(value),
    responseSerialize: (value: SingleCategoryResponse) => Buffer.from(SingleCategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleCategoryResponse.decode(value),
  },
  deleteCategory: {
    path: "/sisa.blog.api.v1.categories.CategoryGrpcService/DeleteCategory",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteCategoryCommand) => Buffer.from(DeleteCategoryCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteCategoryCommand.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface CategoryGrpcServiceServer extends UntypedServiceImplementation {
  getCategories: handleUnaryCall<GetCategoriesQuery, ListCategoriesResponse>;
  findCategoryById: handleUnaryCall<FindCategoryByIdQuery, SingleCategoryResponse>;
  findCategoryBySlug: handleUnaryCall<FindCategoryBySlugQuery, SingleCategoryResponse>;
  createCategory: handleUnaryCall<CreateCategoryCommand, SingleCategoryResponse>;
  updateCategory: handleUnaryCall<UpdateCategoryCommand, SingleCategoryResponse>;
  deleteCategory: handleUnaryCall<DeleteCategoryCommand, Empty>;
}

export interface CategoryGrpcServiceClient extends Client {
  getCategories(
    request: GetCategoriesQuery,
    callback: (error: ServiceError | null, response: ListCategoriesResponse) => void,
  ): ClientUnaryCall;
  getCategories(
    request: GetCategoriesQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListCategoriesResponse) => void,
  ): ClientUnaryCall;
  getCategories(
    request: GetCategoriesQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListCategoriesResponse) => void,
  ): ClientUnaryCall;
  findCategoryById(
    request: FindCategoryByIdQuery,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  findCategoryById(
    request: FindCategoryByIdQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  findCategoryById(
    request: FindCategoryByIdQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  findCategoryBySlug(
    request: FindCategoryBySlugQuery,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  findCategoryBySlug(
    request: FindCategoryBySlugQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  findCategoryBySlug(
    request: FindCategoryBySlugQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  createCategory(
    request: CreateCategoryCommand,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  createCategory(
    request: CreateCategoryCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  createCategory(
    request: CreateCategoryCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  updateCategory(
    request: UpdateCategoryCommand,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  updateCategory(
    request: UpdateCategoryCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  updateCategory(
    request: UpdateCategoryCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleCategoryResponse) => void,
  ): ClientUnaryCall;
  deleteCategory(
    request: DeleteCategoryCommand,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteCategory(
    request: DeleteCategoryCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteCategory(
    request: DeleteCategoryCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
}

export const CategoryGrpcServiceClient = makeGenericClientConstructor(
  CategoryGrpcServiceService,
  "sisa.blog.api.v1.categories.CategoryGrpcService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): CategoryGrpcServiceClient;
  service: typeof CategoryGrpcServiceService;
};
