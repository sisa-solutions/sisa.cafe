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
import { ListCommentsResponse, SingleCommentResponse } from "../comments/responses";
import {
  CreateCommentCommand,
  CreatePostCommand,
  DeletePostCommand,
  PublishPostCommand,
  ReactToPostCommand,
  UpdatePostCommand,
} from "./commands";
import {
  FindPostByIdQuery,
  FindPublishedPostBySlugQuery,
  GetCommentsByPostIdQuery,
  GetPostsQuery,
  GetPublishedPostsQuery,
} from "./queries";
import { ListPostsResponse, SinglePostResponse } from "./responses";

export const protobufPackage = "sisa.blog.api.v1.posts";

export type PostGrpcServiceService = typeof PostGrpcServiceService;
export const PostGrpcServiceService = {
  getPosts: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/GetPosts",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetPostsQuery) => Buffer.from(GetPostsQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetPostsQuery.decode(value),
    responseSerialize: (value: ListPostsResponse) => Buffer.from(ListPostsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListPostsResponse.decode(value),
  },
  findPostById: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/FindPostById",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindPostByIdQuery) => Buffer.from(FindPostByIdQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindPostByIdQuery.decode(value),
    responseSerialize: (value: SinglePostResponse) => Buffer.from(SinglePostResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SinglePostResponse.decode(value),
  },
  getPublishedPosts: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/GetPublishedPosts",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetPublishedPostsQuery) => Buffer.from(GetPublishedPostsQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetPublishedPostsQuery.decode(value),
    responseSerialize: (value: ListPostsResponse) => Buffer.from(ListPostsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListPostsResponse.decode(value),
  },
  findPublishedPostBySlug: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/FindPublishedPostBySlug",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindPublishedPostBySlugQuery) =>
      Buffer.from(FindPublishedPostBySlugQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindPublishedPostBySlugQuery.decode(value),
    responseSerialize: (value: SinglePostResponse) => Buffer.from(SinglePostResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SinglePostResponse.decode(value),
  },
  createPost: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/CreatePost",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreatePostCommand) => Buffer.from(CreatePostCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreatePostCommand.decode(value),
    responseSerialize: (value: SinglePostResponse) => Buffer.from(SinglePostResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SinglePostResponse.decode(value),
  },
  updatePost: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/UpdatePost",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdatePostCommand) => Buffer.from(UpdatePostCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdatePostCommand.decode(value),
    responseSerialize: (value: SinglePostResponse) => Buffer.from(SinglePostResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SinglePostResponse.decode(value),
  },
  publishPost: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/PublishPost",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: PublishPostCommand) => Buffer.from(PublishPostCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => PublishPostCommand.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  deletePost: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/DeletePost",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeletePostCommand) => Buffer.from(DeletePostCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeletePostCommand.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  getCommentsByPostId: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/GetCommentsByPostId",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetCommentsByPostIdQuery) => Buffer.from(GetCommentsByPostIdQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetCommentsByPostIdQuery.decode(value),
    responseSerialize: (value: ListCommentsResponse) => Buffer.from(ListCommentsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListCommentsResponse.decode(value),
  },
  createComment: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/CreateComment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateCommentCommand) => Buffer.from(CreateCommentCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateCommentCommand.decode(value),
    responseSerialize: (value: SingleCommentResponse) => Buffer.from(SingleCommentResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleCommentResponse.decode(value),
  },
  react: {
    path: "/sisa.blog.api.v1.posts.PostGrpcService/React",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReactToPostCommand) => Buffer.from(ReactToPostCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReactToPostCommand.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface PostGrpcServiceServer extends UntypedServiceImplementation {
  getPosts: handleUnaryCall<GetPostsQuery, ListPostsResponse>;
  findPostById: handleUnaryCall<FindPostByIdQuery, SinglePostResponse>;
  getPublishedPosts: handleUnaryCall<GetPublishedPostsQuery, ListPostsResponse>;
  findPublishedPostBySlug: handleUnaryCall<FindPublishedPostBySlugQuery, SinglePostResponse>;
  createPost: handleUnaryCall<CreatePostCommand, SinglePostResponse>;
  updatePost: handleUnaryCall<UpdatePostCommand, SinglePostResponse>;
  publishPost: handleUnaryCall<PublishPostCommand, Empty>;
  deletePost: handleUnaryCall<DeletePostCommand, Empty>;
  getCommentsByPostId: handleUnaryCall<GetCommentsByPostIdQuery, ListCommentsResponse>;
  createComment: handleUnaryCall<CreateCommentCommand, SingleCommentResponse>;
  react: handleUnaryCall<ReactToPostCommand, Empty>;
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
  getPublishedPosts(
    request: GetPublishedPostsQuery,
    callback: (error: ServiceError | null, response: ListPostsResponse) => void,
  ): ClientUnaryCall;
  getPublishedPosts(
    request: GetPublishedPostsQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListPostsResponse) => void,
  ): ClientUnaryCall;
  getPublishedPosts(
    request: GetPublishedPostsQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListPostsResponse) => void,
  ): ClientUnaryCall;
  findPublishedPostBySlug(
    request: FindPublishedPostBySlugQuery,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  findPublishedPostBySlug(
    request: FindPublishedPostBySlugQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SinglePostResponse) => void,
  ): ClientUnaryCall;
  findPublishedPostBySlug(
    request: FindPublishedPostBySlugQuery,
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
  getCommentsByPostId(
    request: GetCommentsByPostIdQuery,
    callback: (error: ServiceError | null, response: ListCommentsResponse) => void,
  ): ClientUnaryCall;
  getCommentsByPostId(
    request: GetCommentsByPostIdQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListCommentsResponse) => void,
  ): ClientUnaryCall;
  getCommentsByPostId(
    request: GetCommentsByPostIdQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListCommentsResponse) => void,
  ): ClientUnaryCall;
  createComment(
    request: CreateCommentCommand,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  createComment(
    request: CreateCommentCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  createComment(
    request: CreateCommentCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  react(request: ReactToPostCommand, callback: (error: ServiceError | null, response: Empty) => void): ClientUnaryCall;
  react(
    request: ReactToPostCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  react(
    request: ReactToPostCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
}

export const PostGrpcServiceClient = makeGenericClientConstructor(
  PostGrpcServiceService,
  "sisa.blog.api.v1.posts.PostGrpcService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): PostGrpcServiceClient;
  service: typeof PostGrpcServiceService;
};
