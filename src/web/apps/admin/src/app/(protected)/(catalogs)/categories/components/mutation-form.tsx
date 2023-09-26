'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import {
  AutocompleteField,
  FormContainer,
  TextField,
  FileUploadInput,
  RichTextField,
  FormActions,
  SubmitButton,
  CancelButton,
} from '@sisa/components';

import type { CategoryResponse, CreateCategoryCommand, UpdateCategoryCommand } from '@sisa/api';

import { getCategories } from 'api/category-api';
import { useState } from 'react';
import { ParentCategoryResponse } from '@sisa/api/src/grpc/generated/sisa/services/blog/v1/categories/responses';

type MutationValues = (CreateCategoryCommand | UpdateCategoryCommand) & {
  parent?: ParentCategoryResponse;
};

export type MutationFormProps = {
  trigger: (data: MutationValues) => Promise<CategoryResponse>;
  defaultValues?: MutationValues;
  mode?: 'CREATE' | 'UPDATE';
};

const MutationForm = ({ trigger, defaultValues }: MutationFormProps) => {
  const [searchParentCategoryName, setSearchParentCategoryName] = useState('');

  const {
    data = {
      value: new Array<CategoryResponse>(),
    },
    isLoading,
  } = useSWR(['/api/v1/categories', searchParentCategoryName], ([_, name]) =>
    getCategories({
      filter: {
        name,
      },
      paging: {
        page: 1,
        pageSize: 10,
      },
    })
  );

  const router = useRouter();
  const { pending } = useFormStatus();

  const { control, handleSubmit, reset } = useForm<MutationValues>({
    defaultValues: {
      ...defaultValues,
      parent: defaultValues?.parent ?? {
        id: '',
        name: '',
      },
    },
  });

  const submit = handleSubmit(async (data) => {
    try {
      const { parent, ...rest } = data;

      await trigger(rest);

      router.push('/categories');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  const onInputChange = (_: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    setSearchParentCategoryName(newValue);
  };

  return (
    <FormContainer orientation="horizontal">
      <AutocompleteField
        control={control}
        name="parent"
        label="Parent Category"
        loading={isLoading}
        options={data.value.map((x) => {
          return {
            id: x.id,
            name: x.name,
          };
        })}
        // @ts-ignore
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        inputValue={searchParentCategoryName}
        onInputChange={onInputChange}
      />
      <TextField control={control} name="name" label="Name" />
      <TextField control={control} name="slug" label="Slug" />
      <FormControl>
        <FormLabel>Picture</FormLabel>
        <FileUploadInput options={{}} />
      </FormControl>
      <RichTextField control={control} error name="description" label="Description" />
      <FormActions>
        <SubmitButton submit={submit} disabled={pending} loading={pending}>
          Save
        </SubmitButton>
        <CancelButton cancel={() => reset(defaultValues)} disabled={pending}>
          Cancel
        </CancelButton>
      </FormActions>
    </FormContainer>
  );
};

export default MutationForm;
