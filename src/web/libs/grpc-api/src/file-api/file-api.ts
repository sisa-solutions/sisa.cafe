'use server';

import { FileGrpcClient as client } from '../clients';

import {
  UpdateFileInfoCommand,
  DeleteFileCommand,
} from '../generated/sisa/services/blog/v1/files/commands';

import { FindFileByIdQuery, GetFilesQuery } from '../generated/sisa/services/blog/v1/files/queries';

import {
  ListFilesResponse,
  FileResponse,
} from '../generated/sisa/services/blog/v1/files/responses';

export const getFiles = (request: GetFilesQuery) => {
  return new Promise<ListFilesResponse>((resolve, reject) => {
    client.getFiles(request, (err, response) => {
      if (err) {
        reject(err);
      }
      if (response) {
        resolve(response);
      }
    });
  });
};

export const findFileById = (request: FindFileByIdQuery) => {
  return new Promise<FileResponse>((resolve, reject) => {
    client.findFileById(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const uploadFile = (formData: FormData) => {
  const file = formData.get('file') as File;
  const path = formData.get('path') as string;
  const name = formData.get('name') as string;
  const contentType = formData.get('contentType') as string;
  const size = formData.get('size') as unknown as number;

  if (!file) {
    throw new Error('No file provided');
  }

  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);

  return new Promise<FileResponse>((resolve, reject) => {
    const call = client.uploadFile((error, { value }) => {
      if (error) {
        reject(error);
      }
      if (value) {
        resolve(value);
      }
    });

    call.write({
      metadata: {
        path,
        name,
        contentType,
        size,
        title: '',
        description: '',
        tags: {},
      },
    });

    const reader = file.stream().getReader();

    const sendChunk = async () => {
      const { done, value } = await reader.read();

      if (!done) {
        call.write({
          content: Buffer.from(value),
        });

        sendChunk();
      } else {
        call.end();
      }
    };

    sendChunk();
  });
};

export const updateFileInfo = (request: UpdateFileInfoCommand) => {
  return new Promise<FileResponse>((resolve, reject) => {
    client.updateFileInfo(request, (err, { value }) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve(value);
      }
    });
  });
};

export const deleteFile = (request: DeleteFileCommand) => {
  return new Promise<void>((resolve, reject) => {
    client.deleteFile(request, (err, value) => {
      if (err) {
        reject(err);
      }
      if (value) {
        resolve();
      }
    });
  });
};
