'use server';

import {
  CreateTagCommand,
  TagGrpcServiceClient,
  TagResponse,
  ChannelCredentials,
  DeleteTagCommand,
  UpdateTagCommand,
  FindTagByIdQuery,
  ListTagsResponse,
  GetTagsQuery,
} from '@sisa/api';

import { API_DNS, channel } from './common';

const client = new TagGrpcServiceClient(API_DNS, ChannelCredentials.createInsecure(), {
  channelOverride: channel,
});

export const getTags = (request: GetTagsQuery) => {
  return new Promise<ListTagsResponse>((resolve, reject) => {
    client.getTags(
      {
        ...request,
      },
      (err, response) => {
        if (err) {
          reject(err);
        }
        if (response) {
          resolve(response);
        }
      }
    );
  });
};

export const findTagById = (request: FindTagByIdQuery) => {
  return new Promise<TagResponse>((resolve, reject) => {
    client.findTagById(
      {
        ...request,
      },
      (err, { value }) => {
        if (err) {
          reject(err);
        }
        if (value) {
          resolve(value);
        }
      }
    );
  });
};

export const createTag = (request: CreateTagCommand) => {
  return new Promise<TagResponse>((resolve, reject) => {
    client.createTag(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const updateTag = (request: UpdateTagCommand) => {
  return new Promise<TagResponse>((resolve, reject) => {
    client.updateTag(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const deleteTag = (request: DeleteTagCommand) => {
  return new Promise<void>((resolve, reject) => {
    client.deleteTag(request, (err, value) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve();
      }
    });
  });
};
