'use server';

import {
  CreateCategoryCommand,
  CategoryGrpcServiceClient,
  CategoryResponse,
  ChannelCredentials,
  DeleteCategoryCommand,
  UpdateCategoryCommand,
  FindCategoryByIdQuery,
  ListCategoriesResponse,
  GetCategoriesQuery,
} from '@sisa/api';

import { API_DNS, channel } from './common';

const client = new CategoryGrpcServiceClient(API_DNS, ChannelCredentials.createInsecure(), {
  channelOverride: channel,
});

export const getCategories = (request: GetCategoriesQuery) => {
  return new Promise<ListCategoriesResponse>((resolve, reject) => {
    client.getCategories(
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

export const findCategoryById = (request: FindCategoryByIdQuery) => {
  return new Promise<CategoryResponse>((resolve, reject) => {
    client.findCategoryById(
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

export const createCategory = (request: CreateCategoryCommand) => {
  return new Promise<CategoryResponse>((resolve, reject) => {
    client.createCategory(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const updateCategory = (request: UpdateCategoryCommand) => {
  return new Promise<CategoryResponse>((resolve, reject) => {
    client.updateCategory(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const deleteCategory = (request: DeleteCategoryCommand) => {
  return new Promise<void>((resolve, reject) => {
    client.deleteCategory(request, (err, value) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve();
      }
    });
  });
};
