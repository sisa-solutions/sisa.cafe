import { useEffect, useState } from 'react';

import { useDropzone, type DropzoneOptions } from 'react-dropzone';

import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';

import { guid } from '@sisa/utils';

import Preview, { type FileWithPreview } from './preview';
import Icon from '../icon';
import { UploadCloudIcon } from 'lucide-react';

export type FileUploadInputProps = {
  options: DropzoneOptions;
};

const FileUploadInput = (_: FileUploadInputProps) => {
  const [files, setFiles] = useState<Array<FileWithPreview>>([]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: true,
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => {
        const newFiles = acceptedFiles.map<FileWithPreview>((file) =>
          Object.assign(file, {
            id: guid(),
            preview: URL.createObjectURL(file),
          })
        );

        return [...prevFiles, ...newFiles];
      });
    },
  });

  const handleRemove = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          boxShadow: 'none',
        }}
        {...getRootProps({ className: 'dropzone' })}
      >
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box sx={{ p: 1, bgcolor: 'primary.softBg', borderRadius: '50%' }}>
            <Box
              className="animate-blink"
              sx={{
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                bgcolor: 'primary.softHoverBg',

                '& > svg': {
                  stroke: 'primary.softColor',
                },
              }}
            >
              <UploadCloudIcon />
            </Box>
          </Box>

          <Typography level="body-sm">
            <Link component="button">Click to upload</Link> or drag and drop
            <br /> SVG, PNG, JPG or GIF (max. 800x400px)
          </Typography>
        </Box>
        <input {...getInputProps()} />
      </Card>

      {files.length > 0 && (
        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} useFlexGap flexWrap="wrap">
          {files.map((file) => (
            <Preview key={file.id} file={file} handleRemove={handleRemove} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default FileUploadInput;
