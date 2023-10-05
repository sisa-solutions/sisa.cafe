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
import { CreateTagCommand, DeleteTagCommand, UpdateTagCommand } from "./commands";
import { FindTagByIdQuery, FindTagBySlugQuery, GetTagsQuery } from "./queries";
import { ListTagsResponse, SingleTagResponse } from "./responses";

export const protobufPackage = "sisa.blog.api.v1.tags";

export type TagGrpcServiceService = typeof TagGrpcServiceService;
export const TagGrpcServiceService = {
  getTags: {
    path: "/sisa.blog.api.v1.tags.TagGrpcService/GetTags",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetTagsQuery) => Buffer.from(GetTagsQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetTagsQuery.decode(value),
    responseSerialize: (value: ListTagsResponse) => Buffer.from(ListTagsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListTagsResponse.decode(value),
  },
  findTagById: {
    path: "/sisa.blog.api.v1.tags.TagGrpcService/FindTagById",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindTagByIdQuery) => Buffer.from(FindTagByIdQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindTagByIdQuery.decode(value),
    responseSerialize: (value: SingleTagResponse) => Buffer.from(SingleTagResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleTagResponse.decode(value),
  },
  findTagBySlug: {
    path: "/sisa.blog.api.v1.tags.TagGrpcService/FindTagBySlug",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindTagBySlugQuery) => Buffer.from(FindTagBySlugQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindTagBySlugQuery.decode(value),
    responseSerialize: (value: SingleTagResponse) => Buffer.from(SingleTagResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleTagResponse.decode(value),
  },
  createTag: {
    path: "/sisa.blog.api.v1.tags.TagGrpcService/CreateTag",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateTagCommand) => Buffer.from(CreateTagCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateTagCommand.decode(value),
    responseSerialize: (value: SingleTagResponse) => Buffer.from(SingleTagResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleTagResponse.decode(value),
  },
  updateTag: {
    path: "/sisa.blog.api.v1.tags.TagGrpcService/UpdateTag",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateTagCommand) => Buffer.from(UpdateTagCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateTagCommand.decode(value),
    responseSerialize: (value: SingleTagResponse) => Buffer.from(SingleTagResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleTagResponse.decode(value),
  },
  deleteTag: {
    path: "/sisa.blog.api.v1.tags.TagGrpcService/DeleteTag",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteTagCommand) => Buffer.from(DeleteTagCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteTagCommand.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface TagGrpcServiceServer extends UntypedServiceImplementation {
  getTags: handleUnaryCall<GetTagsQuery, ListTagsResponse>;
  findTagById: handleUnaryCall<FindTagByIdQuery, SingleTagResponse>;
  findTagBySlug: handleUnaryCall<FindTagBySlugQuery, SingleTagResponse>;
  createTag: handleUnaryCall<CreateTagCommand, SingleTagResponse>;
  updateTag: handleUnaryCall<UpdateTagCommand, SingleTagResponse>;
  deleteTag: handleUnaryCall<DeleteTagCommand, Empty>;
}

export interface TagGrpcServiceClient extends Client {
  getTags(
    request: GetTagsQuery,
    callback: (error: ServiceError | null, response: ListTagsResponse) => void,
  ): ClientUnaryCall;
  getTags(
    request: GetTagsQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListTagsResponse) => void,
  ): ClientUnaryCall;
  getTags(
    request: GetTagsQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListTagsResponse) => void,
  ): ClientUnaryCall;
  findTagById(
    request: FindTagByIdQuery,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  findTagById(
    request: FindTagByIdQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  findTagById(
    request: FindTagByIdQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  findTagBySlug(
    request: FindTagBySlugQuery,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  findTagBySlug(
    request: FindTagBySlugQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  findTagBySlug(
    request: FindTagBySlugQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  createTag(
    request: CreateTagCommand,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  createTag(
    request: CreateTagCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  createTag(
    request: CreateTagCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  updateTag(
    request: UpdateTagCommand,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  updateTag(
    request: UpdateTagCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  updateTag(
    request: UpdateTagCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleTagResponse) => void,
  ): ClientUnaryCall;
  deleteTag(
    request: DeleteTagCommand,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteTag(
    request: DeleteTagCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteTag(
    request: DeleteTagCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
}

export const TagGrpcServiceClient = makeGenericClientConstructor(
  TagGrpcServiceService,
  "sisa.blog.api.v1.tags.TagGrpcService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): TagGrpcServiceClient;
  service: typeof TagGrpcServiceService;
};
