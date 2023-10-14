'use client';

import { useRouter } from 'next/navigation';

import {
  useForm,
  yupResolver,
  yup,
  FormContainer,
  TextField,
  RichTextField,
  FormActions,
  SubmitButton,
  CancelButton,
  FileUploadField,
} from '@sisa/form';

import {
  type TagResponse,
  type CreateTagCommand,
  type UpdateTagCommand,
  uploadFile,
} from '@sisa/grpc-api';
import { randomId } from '@sisa/utils';

type AdditionFormValues = {
  pictures?: File[];
};

type FormValues = (CreateTagCommand | UpdateTagCommand) & AdditionFormValues;

const creationSchema = yup.object<FormValues>({
  name: yup.string().required().min(4).max(100).label('Name'),
  slug: yup.string().required().min(4).max(100).lowercase().label('Slug'),

  description: yup.string().max(500).optional().label('Description'),
  parentId: yup.string().optional(),
  pictures: yup.array<File>().optional().label('Pictures'),
});

const updateSchema = creationSchema.shape({
  id: yup.string().uuid().required(),
});

const validationSchema = yup.lazy((values: FormValues) => {
  return 'id' in values ? updateSchema : creationSchema;
});

type MutationFormProps = {
  trigger: (data: CreateTagCommand | UpdateTagCommand) => Promise<TagResponse>;
  defaultValues?: FormValues;
};

const MutationForm = ({ trigger, defaultValues }: MutationFormProps) => {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (data) => {
    try {
      const { pictures = [], ...rest } = data;

      if (pictures.length > 0) {
        const formData = new FormData();
        const file = pictures[0];

        formData.append('file', file);
        formData.append('path', 'categories');
        formData.append('name', file.name);
        formData.append('contentType', file.type);
        formData.append('size', `${file.size}`);

        await uploadFile(formData);
      }

      await trigger(rest);

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
      <TextField control={control} required name="name" label="Name" />
      <TextField control={control} required name="slug" label="Slug" />
      <FileUploadField
        control={control}
        name="pictures"
        label="Pictures"
        options={{
          accept: {
            'image/*': [],
          },
          multiple: false,
          maxFiles: 1,
        }}
      />
      <RichTextField control={control} error name="description" label="Description" />
      <FormActions>
        <SubmitButton submit={submit}>Save</SubmitButton>
        <CancelButton cancel={() => reset(defaultValues)}>Cancel</CancelButton>
      </FormActions>
    </FormContainer>
  );
};

export default MutationForm;
