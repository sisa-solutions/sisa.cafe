'use server';

import { Combinator, DEFAULT_PAGING_PARAMS, Operator } from '../common';
import { PostGrpcClient as client } from '../clients';
import { CommentResponse } from '../generated/sisa/services/blog/v1/comments/responses';

import {
  CreatePostCommand,
  UpdatePostCommand,
  DeletePostCommand,
  CreateCommentCommand,
  ReactToPostCommand,
} from '../generated/sisa/services/blog/v1/posts/commands';

import { FindPostByIdQuery, GetPostsQuery } from '../generated/sisa/services/blog/v1/posts/queries';

import {
  ListPostsResponse,
  PostResponse,
} from '../generated/sisa/services/blog/v1/posts/responses';

export const getPosts = (request: GetPostsQuery) => {
  const response = new Promise<ListPostsResponse>((resolve, reject) => {
    client.getPosts(request, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response) {
        resolve(response);
      }
    });
  });

  return response;
};

export const getPublishedPosts = (pageIndex: number) => {
  const response = new Promise<ListPostsResponse>((resolve, reject) => {
    client.getPublishedPosts(
      {
        filter: {
          combinator: Combinator.AND,
          not: false,
          rules: [],
        },
        paging: {
          ...DEFAULT_PAGING_PARAMS,
          pageIndex,
        },
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

  return response;
};

export const getPublishedPostsByTagSlug = (pageIndex: number, tagSlug: string) => {
  const response = new Promise<ListPostsResponse>((resolve, reject) => {
    client.getPublishedPosts(
      {
        filter: {
          combinator: Combinator.AND,
          not: false,
          rules: [
            {
              combinator: Combinator.AND,
              not: false,
              rules: [],
              field: 'TagSlugs',
              operator: Operator.CONTAINS,
              value: tagSlug,
            },
          ],
        },
        paging: {
          ...DEFAULT_PAGING_PARAMS,
          pageIndex,
        },
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

  return response;
};

export const getPublishedPostsByCategorySlug = (pageIndex: number, categorySlug: string) => {
  const response = new Promise<ListPostsResponse>((resolve, reject) => {
    client.getPublishedPosts(
      {
        filter: {
          combinator: Combinator.AND,
          not: false,
          rules: [
            {
              combinator: Combinator.AND,
              not: false,
              rules: [],
              field: 'Category.Slug',
              operator: Operator.EQUAL,
              value: categorySlug,
            },
          ],
        },
        paging: {
          ...DEFAULT_PAGING_PARAMS,
          pageIndex,
        },
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

  return response;
};

export const findPostById = (request: FindPostByIdQuery) => {
  return new Promise<PostResponse>((resolve, reject) => {
    client.findPostById(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const findPublishedPostBySlug = (slug: string) => {
  return new Promise<PostResponse>((resolve, reject) => {
    client.findPublishedPostBySlug(
      {
        slug,
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

export const createPost = (request: CreatePostCommand) => {
  return new Promise<PostResponse>((resolve, reject) => {
    client.createPost(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const updatePost = (request: UpdatePostCommand) => {
  return new Promise<PostResponse>((resolve, reject) => {
    client.updatePost(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const deletePost = (request: DeletePostCommand) => {
  return new Promise<void>((resolve, reject) => {
    client.deletePost(request, (err, value) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve();
      }
    });
  });
};

export const comment = (request: CreateCommentCommand) => {
  return new Promise<CommentResponse>((resolve, reject) => {
    client.createComment(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const reactToPost = (request: ReactToPostCommand) => {
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
