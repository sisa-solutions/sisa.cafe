'use server';

import { IncomingForm } from 'formidable';

import { FileGrpcClient as client } from '../clients';

import {
  UpdateFileInfoCommand,
  UploadFileCommand,
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
  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
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
      info: {
        name,
        type,
        size,
        title: '',
        description: '',
        tags: {},
      },
    });

    const reader = file.stream().getReader();

    // const sendChunk = async () => {
    //   const { done, value } = await reader.read();

    //   if (!done) {
    //     call.write({
    //       content: Buffer.from(value),
    //     });

    //     sendChunk();
    //   } else {
    //     call.end();
    //   }
    // };

    const sendChunk = async () => {
      let done = false;

      while (!done) {
        const { done: isDone, value } = await reader.read();
        done = isDone;

        if (!done) {
          call.write({
            content: Buffer.from(value!),
          });
        }
      }

      call.end();
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
