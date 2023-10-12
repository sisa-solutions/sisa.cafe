'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import {
  FormContainer,
  TextField,
  FileUploadInput,
  RichTextField,
  FormActions,
  SubmitButton,
  CancelButton,
} from '@sisa/form';

import type { TagResponse, CreateTagCommand, UpdateTagCommand } from '@sisa/grpc-api';
import { randomId } from '@sisa/utils';

type MutationValues = CreateTagCommand | UpdateTagCommand;

export type MutationFormProps = {
  trigger: (data: MutationValues) => Promise<TagResponse>;
  defaultValues?: MutationValues;
  mode?: 'CREATE' | 'UPDATE';
};

const MutationForm = ({ trigger, defaultValues }: MutationFormProps) => {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<MutationValues>({
    defaultValues,
  });

  const submit = handleSubmit(async (data) => {
    try {
      await trigger(data);

      goBack();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  const goBack = () => {
    router.push(`/tags?_s=${randomId()}`);
  };

  return (
    <FormContainer orientation="horizontal">
      <TextField control={control} name="name" label="Name" />
      <TextField control={control} name="slug" label="Slug" />
      <FormControl>
        <FormLabel>Picture</FormLabel>
        <FileUploadInput options={{}} />
      </FormControl>
      <RichTextField control={control} error name="description" label="Description" />
      <FormActions>
        <SubmitButton submit={submit}>
          Save
        </SubmitButton>
        <CancelButton cancel={() => reset(defaultValues)}>
          Cancel
        </CancelButton>
      </FormActions>
    </FormContainer>
  );
};

export default MutationForm;
