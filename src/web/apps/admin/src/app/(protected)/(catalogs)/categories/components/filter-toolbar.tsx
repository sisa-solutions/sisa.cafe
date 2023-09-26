'use client';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

import { EraserIcon, SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TextField } from '@sisa/components';
import { useCallback } from 'react';

type FilterFormValues = {
  name?: string;
};

type FilterToolbarProps = {
  defaultValues?: FilterFormValues;
};

const FilterToolbar = ({ defaultValues }: FilterToolbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const { control, handleSubmit, reset } = useForm<FilterFormValues>({
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit((data) => {
    try {
      // @ts-ignore
      router.push(pathname + '?' + createQueryString('name', data.name));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  const onReset = () => {
    reset({
      name: '',
    });

    // @ts-ignore
    router.push(pathname);
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
      <TextField sx={{ flexGrow: 1 }} control={control} name="name" label="Name" />
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
