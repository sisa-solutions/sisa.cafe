'use client';

import { useForm } from 'react-hook-form';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

import { EraserIcon, SearchIcon } from 'lucide-react';

import { TextField } from '@sisa/form';
import { useQueryString } from '@sisa/hooks';

type FilterFormValues = {
  keyword?: string;
};

type FilterToolbarProps = {
  defaultValues?: FilterFormValues;
};

const FilterToolbar = ({ defaultValues }: FilterToolbarProps) => {
  const setQueryString = useQueryString();

  const { control, handleSubmit, reset } = useForm<FilterFormValues>({
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit((data) => {
    try {
      // @ts-ignore
      setQueryString({
        keyword: data.keyword,
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  const onReset = () => {
    reset({
      keyword: '',
    });

    setQueryString({
      keyword: '',
    });
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  const renderActions = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 1.5,
        flex: 1,

        '& > button': {
          flex: 1,
        },
      }}
    >
      <Button variant="soft" color="primary" startDecorator={<EraserIcon />} onClick={onReset}>
        Clear
      </Button>
      <Button variant="solid" color="primary" startDecorator={<SearchIcon />} onClick={onSubmit}>
        Search
      </Button>
    </Box>
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
        sx={{ flexGrow: 1 }}
        control={control}
        name="keyword"
        label="Keyword"
        onKeyDown={onEnter}
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
