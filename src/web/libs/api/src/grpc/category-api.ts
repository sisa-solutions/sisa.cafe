'use server';

import { Combinator, Operator } from './common';
import { CategoryGrpcClient as client } from './clients';

import {
  CreateCategoryCommand,
  UpdateCategoryCommand,
  DeleteCategoryCommand,
} from './generated/sisa/services/blog/v1/categories/commands';

import {
  GetCategoriesQuery,
  FindCategoryByIdQuery,
  FindCategoryBySlugQuery,
} from './generated/sisa/services/blog/v1/categories/queries';

import type {
  CategoryResponse,
  ListCategoriesResponse,
} from './generated/sisa/services/blog/v1/categories/responses';

export const getCategories = (request: GetCategoriesQuery) => {
  const response = new Promise<ListCategoriesResponse>((resolve, reject) => {
    client.getCategories(request,
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

  return response;
};

export const findCategoryById = (request: FindCategoryByIdQuery) => {
  return new Promise<CategoryResponse>((resolve, reject) => {
    client.findCategoryById(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const findCategoryBySlug = (request: FindCategoryBySlugQuery) => {
  return new Promise<CategoryResponse>((resolve, reject) => {
    client.findCategoryBySlug(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
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
