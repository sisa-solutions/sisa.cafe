'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { useRouter } from 'next/navigation';

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

import { useForm } from 'react-hook-form';
import { type CategoryResponse } from '@sisa/api';

export type MutationFormProps = {
  trigger: (data: CategoryResponse) => Promise<CategoryResponse>;
  defaultValues?: CategoryResponse;
};

const MutationForm = ({ trigger, defaultValues }: MutationFormProps) => {
  const router = useRouter();
  const { pending } = useFormStatus();

  const { control, handleSubmit, reset } = useForm<CategoryResponse>({
    defaultValues,
  });

  const submit = handleSubmit(async (data) => {
    try {
      await trigger(data);

      router.push('/categories');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  return (
    <FormContainer orientation="horizontal">
      <AutocompleteField
        control={control}
        name="parentId"
        label="Parent Category"
        options={['1', '2', '3']}
        getOptionLabel={(option) => 'Option ' + option}
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
