'use server';

import { TagGrpcClient as client } from '../clients';

import {
  CreateTagCommand,
  DeleteTagCommand,
  UpdateTagCommand,
} from '../generated/sisa/services/blog/v1/tags/commands';

import {
  FindTagByIdQuery,
  GetTagsQuery,
} from '../generated/sisa/services/blog/v1/tags/queries';

import { ListTagsResponse, TagResponse } from '../generated/sisa/services/blog/v1/tags/responses';

export const getTags = (request: GetTagsQuery) => {
  return new Promise<ListTagsResponse>((resolve, reject) => {
    client.getTags(request, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response) {
        resolve(response);
      }
    });
  });
};

export const findTagById = (request: FindTagByIdQuery) => {
  return new Promise<TagResponse>((resolve, reject) => {
    client.findTagById(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const findTagBySlug = (slug: string) => {
  return new Promise<TagResponse>((resolve, reject) => {
    client.findTagBySlug({ slug }, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
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
