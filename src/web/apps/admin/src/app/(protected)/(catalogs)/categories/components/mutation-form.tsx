'use client';

import { useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import useQuery from 'swr';

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

import {
  type CategoryResponse,
  type CategoryInfoResponse,
  type CreateCategoryCommand,
  type UpdateCategoryCommand,
} from '@sisa/api';

import { getParentCategories } from 'api/category-api';
import { randomId } from '@sisa/utils';

type MutationValues = (CreateCategoryCommand | UpdateCategoryCommand) & {
  parent?: CategoryInfoResponse;
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
  } = useQuery(['/api/v1/categories', searchParentCategoryName], ([_, name]) =>
    getParentCategories(name)
  );

  const router = useRouter();
  const { pending } = useFormStatus();

  const { control, handleSubmit } = useForm<MutationValues>({
    defaultValues: {
      ...defaultValues,
      parent: defaultValues?.parent ?? {
        id: '',
        name: '',
      },
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { parent, ...rest } = data;

      await trigger({
        ...rest,
        parentId: parent?.id ?? '',
      });

      router.push(`/categories?_s=${randomId()}`);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  const onCancel = () => {
    router.push('/categories');
  };

  const onInputChange = (_: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    if (!newValue) return;

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
        <SubmitButton submit={onSubmit} disabled={pending} loading={pending}>
          Save
        </SubmitButton>
        <CancelButton cancel={onCancel} disabled={pending}>
          Cancel
        </CancelButton>
      </FormActions>
    </FormContainer>
  );
};

export default MutationForm;
