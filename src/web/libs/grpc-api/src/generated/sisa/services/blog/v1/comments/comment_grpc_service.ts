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
import { DeleteCommentCommand, ReactToCommentCommand, ReplyCommentCommand, UpdateCommentCommand } from "./commands";
import { FindCommentByIdQuery, GetCommentsQuery } from "./queries";
import { ListCommentsResponse, SingleCommentResponse } from "./responses";

export const protobufPackage = "sisa.blog.api.v1.comments";

export type CommentGrpcServiceService = typeof CommentGrpcServiceService;
export const CommentGrpcServiceService = {
  getComments: {
    path: "/sisa.blog.api.v1.comments.CommentGrpcService/GetComments",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetCommentsQuery) => Buffer.from(GetCommentsQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetCommentsQuery.decode(value),
    responseSerialize: (value: ListCommentsResponse) => Buffer.from(ListCommentsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListCommentsResponse.decode(value),
  },
  findCommentById: {
    path: "/sisa.blog.api.v1.comments.CommentGrpcService/FindCommentById",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindCommentByIdQuery) => Buffer.from(FindCommentByIdQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindCommentByIdQuery.decode(value),
    responseSerialize: (value: SingleCommentResponse) => Buffer.from(SingleCommentResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleCommentResponse.decode(value),
  },
  replyComment: {
    path: "/sisa.blog.api.v1.comments.CommentGrpcService/ReplyComment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReplyCommentCommand) => Buffer.from(ReplyCommentCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReplyCommentCommand.decode(value),
    responseSerialize: (value: SingleCommentResponse) => Buffer.from(SingleCommentResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleCommentResponse.decode(value),
  },
  updateComment: {
    path: "/sisa.blog.api.v1.comments.CommentGrpcService/UpdateComment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateCommentCommand) => Buffer.from(UpdateCommentCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateCommentCommand.decode(value),
    responseSerialize: (value: SingleCommentResponse) => Buffer.from(SingleCommentResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleCommentResponse.decode(value),
  },
  deleteComment: {
    path: "/sisa.blog.api.v1.comments.CommentGrpcService/DeleteComment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteCommentCommand) => Buffer.from(DeleteCommentCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteCommentCommand.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  react: {
    path: "/sisa.blog.api.v1.comments.CommentGrpcService/React",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ReactToCommentCommand) => Buffer.from(ReactToCommentCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReactToCommentCommand.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface CommentGrpcServiceServer extends UntypedServiceImplementation {
  getComments: handleUnaryCall<GetCommentsQuery, ListCommentsResponse>;
  findCommentById: handleUnaryCall<FindCommentByIdQuery, SingleCommentResponse>;
  replyComment: handleUnaryCall<ReplyCommentCommand, SingleCommentResponse>;
  updateComment: handleUnaryCall<UpdateCommentCommand, SingleCommentResponse>;
  deleteComment: handleUnaryCall<DeleteCommentCommand, Empty>;
  react: handleUnaryCall<ReactToCommentCommand, Empty>;
}

export interface CommentGrpcServiceClient extends Client {
  getComments(
    request: GetCommentsQuery,
    callback: (error: ServiceError | null, response: ListCommentsResponse) => void,
  ): ClientUnaryCall;
  getComments(
    request: GetCommentsQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListCommentsResponse) => void,
  ): ClientUnaryCall;
  getComments(
    request: GetCommentsQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListCommentsResponse) => void,
  ): ClientUnaryCall;
  findCommentById(
    request: FindCommentByIdQuery,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  findCommentById(
    request: FindCommentByIdQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  findCommentById(
    request: FindCommentByIdQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  replyComment(
    request: ReplyCommentCommand,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  replyComment(
    request: ReplyCommentCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  replyComment(
    request: ReplyCommentCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  updateComment(
    request: UpdateCommentCommand,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  updateComment(
    request: UpdateCommentCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  updateComment(
    request: UpdateCommentCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleCommentResponse) => void,
  ): ClientUnaryCall;
  deleteComment(
    request: DeleteCommentCommand,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteComment(
    request: DeleteCommentCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteComment(
    request: DeleteCommentCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  react(
    request: ReactToCommentCommand,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  react(
    request: ReactToCommentCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  react(
    request: ReactToCommentCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
}

export const CommentGrpcServiceClient = makeGenericClientConstructor(
  CommentGrpcServiceService,
  "sisa.blog.api.v1.comments.CommentGrpcService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): CommentGrpcServiceClient;
  service: typeof CommentGrpcServiceService;
};
