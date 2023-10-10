/* eslint-disable */
import {
  ChannelCredentials,
  Client,
  ClientWritableStream,
  handleClientStreamingCall,
  makeGenericClientConstructor,
  Metadata,
} from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import { Empty } from "../../../../../google/protobuf/empty";
import { DeleteFileCommand, UpdateFileInfoCommand, UploadFileCommand } from "./commands";
import { FindFileByIdQuery, GetFilesQuery } from "./queries";
import { ListFilesResponse, SingleFileResponse } from "./responses";

export const protobufPackage = "sisa.blog.api.v1.files";

export type FileGrpcServiceService = typeof FileGrpcServiceService;
export const FileGrpcServiceService = {
  getFiles: {
    path: "/sisa.blog.api.v1.files.FileGrpcService/GetFiles",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetFilesQuery) => Buffer.from(GetFilesQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetFilesQuery.decode(value),
    responseSerialize: (value: ListFilesResponse) => Buffer.from(ListFilesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListFilesResponse.decode(value),
  },
  findFileById: {
    path: "/sisa.blog.api.v1.files.FileGrpcService/FindFileById",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindFileByIdQuery) => Buffer.from(FindFileByIdQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindFileByIdQuery.decode(value),
    responseSerialize: (value: SingleFileResponse) => Buffer.from(SingleFileResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleFileResponse.decode(value),
  },
  uploadFile: {
    path: "/sisa.blog.api.v1.files.FileGrpcService/UploadFile",
    requestStream: true,
    responseStream: false,
    requestSerialize: (value: UploadFileCommand) => Buffer.from(UploadFileCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UploadFileCommand.decode(value),
    responseSerialize: (value: SingleFileResponse) => Buffer.from(SingleFileResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleFileResponse.decode(value),
  },
  updateFileInfo: {
    path: "/sisa.blog.api.v1.files.FileGrpcService/UpdateFileInfo",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateFileInfoCommand) => Buffer.from(UpdateFileInfoCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateFileInfoCommand.decode(value),
    responseSerialize: (value: SingleFileResponse) => Buffer.from(SingleFileResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SingleFileResponse.decode(value),
  },
  deleteFile: {
    path: "/sisa.blog.api.v1.files.FileGrpcService/DeleteFile",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteFileCommand) => Buffer.from(DeleteFileCommand.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteFileCommand.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface FileGrpcServiceServer extends UntypedServiceImplementation {
  getFiles: handleUnaryCall<GetFilesQuery, ListFilesResponse>;
  findFileById: handleUnaryCall<FindFileByIdQuery, SingleFileResponse>;
  uploadFile: handleClientStreamingCall<UploadFileCommand, SingleFileResponse>;
  updateFileInfo: handleUnaryCall<UpdateFileInfoCommand, SingleFileResponse>;
  deleteFile: handleUnaryCall<DeleteFileCommand, Empty>;
}

export interface FileGrpcServiceClient extends Client {
  getFiles(
    request: GetFilesQuery,
    callback: (error: ServiceError | null, response: ListFilesResponse) => void,
  ): ClientUnaryCall;
  getFiles(
    request: GetFilesQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListFilesResponse) => void,
  ): ClientUnaryCall;
  getFiles(
    request: GetFilesQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListFilesResponse) => void,
  ): ClientUnaryCall;
  findFileById(
    request: FindFileByIdQuery,
    callback: (error: ServiceError | null, response: SingleFileResponse) => void,
  ): ClientUnaryCall;
  findFileById(
    request: FindFileByIdQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleFileResponse) => void,
  ): ClientUnaryCall;
  findFileById(
    request: FindFileByIdQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleFileResponse) => void,
  ): ClientUnaryCall;
  uploadFile(
    callback: (error: ServiceError | null, response: SingleFileResponse) => void,
  ): ClientWritableStream<UploadFileCommand>;
  uploadFile(
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleFileResponse) => void,
  ): ClientWritableStream<UploadFileCommand>;
  uploadFile(
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleFileResponse) => void,
  ): ClientWritableStream<UploadFileCommand>;
  uploadFile(
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleFileResponse) => void,
  ): ClientWritableStream<UploadFileCommand>;
  updateFileInfo(
    request: UpdateFileInfoCommand,
    callback: (error: ServiceError | null, response: SingleFileResponse) => void,
  ): ClientUnaryCall;
  updateFileInfo(
    request: UpdateFileInfoCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SingleFileResponse) => void,
  ): ClientUnaryCall;
  updateFileInfo(
    request: UpdateFileInfoCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SingleFileResponse) => void,
  ): ClientUnaryCall;
  deleteFile(
    request: DeleteFileCommand,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteFile(
    request: DeleteFileCommand,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  deleteFile(
    request: DeleteFileCommand,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
}

export const FileGrpcServiceClient = makeGenericClientConstructor(
  FileGrpcServiceService,
  "sisa.blog.api.v1.files.FileGrpcService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): FileGrpcServiceClient;
  service: typeof FileGrpcServiceService;
};
