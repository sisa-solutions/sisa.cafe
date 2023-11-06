'use client';

import { useForm } from 'react-hook-form';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';

import { EraserIcon, SearchIcon } from 'lucide-react';

import { type SelectOption, SelectField, TextField } from '@sisa/form';
import { useQueryString } from '@sisa/hooks';
import { PostStatus } from '@sisa/grpc-api';

type FilterFormValues = {
  name?: string;
  status?: PostStatus;
};

type FilterToolbarProps = {
  defaultValues?: FilterFormValues;
};

const FilterToolbar = ({ defaultValues }: FilterToolbarProps) => {
  const setQueryString = useQueryString();

  const options: Array<SelectOption<number>> = [
    {
      value: PostStatus.UNSPECIFIED,
      label: 'All',
    },
    {
      value: PostStatus.DRAFT,
      label: 'Draft',
    },
    {
      value: PostStatus.PUBLISHED,
      label: 'Published',
    },
    {
      value: PostStatus.ARCHIVED,
      label: 'Archived',
    },
  ];

  const { control, handleSubmit, reset } = useForm<FilterFormValues>({
    defaultValues: {
      ...defaultValues,
      status: PostStatus.UNSPECIFIED,
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      // @ts-ignore
      setQueryString({
        name: data.name,
        status: data.status,
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  const onReset = () => {
    reset({
      name: '',
      status: PostStatus.UNSPECIFIED,
    });

    setQueryString({
      name: '',
      status: PostStatus.UNSPECIFIED,
    });
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  const renderActions = () => (
    <ButtonGroup spacing={1}>
      <Button startDecorator={<EraserIcon />} onClick={onReset}>
        Clear
      </Button>
      <Button variant="solid" color="primary" startDecorator={<SearchIcon />} onClick={onSubmit}>
        Search
      </Button>
    </ButtonGroup>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flex: 1,
        gap: 1.5,
      }}
    >
      <TextField
        control={control}
        name="name"
        label="Name"
        onKeyDown={onEnter}
        sx={{ flexGrow: 1 }}
      />
      <SelectField
        control={control}
        name="status"
        label="Status"
        options={options}
        sx={{
          minWidth: 150,
        }}
      />
      <Box
        sx={{
          gap: 1.5,
        }}
      >
        {renderActions()}
      </Box>
    </Box>
  );
};

export default FilterToolbar;
