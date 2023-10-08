'use server';

import { CommentGrpcClient as client } from '../clients';

import {
  DeleteCommentCommand,
  ReactToCommentCommand,
  ReplyCommentCommand,
} from './generated/sisa/services/blog/v1/comments/commands';

import {
  FindCommentByIdQuery,
  GetCommentsQuery,
} from './generated/sisa/services/blog/v1/comments/queries';

import {
  CommentResponse,
  ListCommentsResponse,
} from './generated/sisa/services/blog/v1/comments/responses';

export const getComments = (request: GetCommentsQuery) => {
  return new Promise<ListCommentsResponse>((resolve, reject) => {
    client.getComments(request, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response) {
        resolve(response);
      }
    });
  });
};

export const findCommentById = (request: FindCommentByIdQuery) => {
  return new Promise<CommentResponse>((resolve, reject) => {
    client.findCommentById(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const reply = (request: ReplyCommentCommand) => {
  return new Promise<CommentResponse>((resolve, reject) => {
    client.replyComment(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const deleteComment = (request: DeleteCommentCommand) => {
  return new Promise<void>((resolve, reject) => {
    client.deleteComment(request, (err, value) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve();
      }
    });
  });
};

export const reactToComment = (request: ReactToCommentCommand) => {
  return new Promise<void>((resolve, reject) => {
    client.react(request, (err, value) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve();
      }
    });
  });
};
