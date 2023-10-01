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
import { CreatePostCommand, DeletePostCommand, PublishPostCommand, UpdatePostCommand } from "./commands";
import { FindPostByIdQuery, GetPostsQuery } from "./queries";
import { ListPostsResponse, SinglePostResponse } from "./responses";

export const protobufPackage = "sisa.blog.api";

export type PostGrpcServiceService = typeof PostGrpcServiceService;
export const PostGrpcServiceService = {
  getPosts: {
    path: "/sisa.blog.api.PostGrpcService/GetPosts",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetPostsQuery) => Buffer.from(GetPostsQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetPostsQuery.decode(value),
    responseSerialize: (value: ListPostsResponse) => Buffer.from(ListPostsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListPostsResponse.decode(value),
  },
  findPostById: {
    path: "/sisa.blog.api.PostGrpcService/FindPostById",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindPostByIdQuery) => Buffer.from(FindPostByIdQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindPostByIdQuery.decode(value),
    responseSerialize: (value: SinglePostResponse) => Buffer.from(SinglePostResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SinglePostResponse.decode(value),
  },
  createPost: {
    path: "/sisa.blog.api.PostGrpcService/CreatePost",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreatePostCommand) => Buffer.from(CreatePostCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreatePostCommand.decode(value),
    responseSerialize: (value: SinglePostResponse) => Buffer.from(SinglePostResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SinglePostResponse.decode(value),
  },
  updatePost: {
    path: "/sisa.blog.api.PostGrpcService/UpdatePost",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdatePostCommand) => Buffer.from(UpdatePostCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdatePostCommand.decode(value),
    responseSerialize: (value: SinglePostResponse) => Buffer.from(SinglePostResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SinglePostResponse.decode(value),
  },
  publishPost: {
    path: "/sisa.blog.api.PostGrpcService/PublishPost",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: PublishPostCommand) => Buffer.from(PublishPostCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => PublishPostCommand.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  deletePost: {
    path: "/sisa.blog.api.PostGrpcService/DeletePost",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeletePostCommand) => Buffer.from(DeletePostCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeletePostCommand.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface PostGrpcServiceServer extends UntypedServiceImplementation {
  getPosts: handleUnaryCall<GetPostsQuery, ListPostsResponse>;
  findPostById: handleUnaryCall<FindPostByIdQuery, SinglePostResponse>;
  createPost: handleUnaryCall<CreatePostCommand, SinglePostResponse>;
  updatePost: handleUnaryCall<UpdatePostCommand, SinglePostResponse>;
  publishPost: handleUnaryCall<PublishPostCommand, Empty>;
  deletePost: handleUnaryCall<DeletePostCommand, Empty>;
}

export interface PostGrpcServiceClient extends Client {
  getPosts(
    request: GetPostsQuery,
    callback: (error: ServiceError | null, response: ListPostsResponse) => void,
  ): ClientUnaryCall;
  getPosts(
    request: GetPostsQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListPostsResponse) => void,
  ): ClientUnaryCall;
  getPosts(
    request: GetPostsQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListPostsResponse) => void,
  ): ClientUnaryCall;
  findPostById(
    request: FindPostByIdQuery,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  findPostById(
    request: FindPostByIdQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  findPostById(
    request: FindPostByIdQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  createPost(
    request: CreatePostCommand,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  createPost(
    request: CreatePostCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  createPost(
    request: CreatePostCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  updatePost(
    request: UpdatePostCommand,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  updatePost(
    request: UpdatePostCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  updatePost(
    request: UpdatePostCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  publishPost(
    request: PublishPostCommand,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  publishPost(
    request: PublishPostCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  publishPost(
    request: PublishPostCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deletePost(
    request: DeletePostCommand,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deletePost(
    request: DeletePostCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deletePost(
    request: DeletePostCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
}

export const PostGrpcServiceClient = makeGenericClientConstructor(
  PostGrpcServiceService,
  "sisa.blog.api.PostGrpcService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): PostGrpcServiceClient;
  service: typeof PostGrpcServiceService;
};
