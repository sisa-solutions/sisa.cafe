'use client';

import { useForm } from 'react-hook-form';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';

import { EraserIcon, SearchIcon } from 'lucide-react';

import { TextField } from '@sisa/form';
import { useQueryString } from '@sisa/hooks';
import useClientI18n from 'i18n/use-client-i18n';

type FilterFormValues = {
  keyword?: string;
};

type FilterToolbarProps = {
  defaultValues?: FilterFormValues;
};

const FilterToolbar = ({ defaultValues }: FilterToolbarProps) => {
  const { t } = useClientI18n();
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
    <ButtonGroup spacing={1}>
      <Button startDecorator={<EraserIcon />} onClick={onReset}>
        {t('label.clear')}
      </Button>
      <Button variant="solid" color="primary" startDecorator={<SearchIcon />} onClick={onSubmit}>
        {t('label.search')}
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
        sx={{ flexGrow: 1 }}
        control={control}
        name="keyword"
        label={t('label.keyword')}
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
