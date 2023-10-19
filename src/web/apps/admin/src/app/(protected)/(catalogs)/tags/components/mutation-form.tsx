'use client';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import useMutation from 'swr/mutation';

import IconButton from '@mui/joy/IconButton';
import { EditIcon } from 'lucide-react';

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
  getTags,
  uploadFile,
  Combinator,
  Operator,
} from '@sisa/grpc-api';
import { randomId, slugify } from '@sisa/utils';

type AdditionFormValues = {
  pictures?: File[];
};

type FormValues = (CreateTagCommand | UpdateTagCommand) & AdditionFormValues;

type MutationFormProps = {
  trigger: (data: CreateTagCommand | UpdateTagCommand) => Promise<TagResponse>;
  defaultValues?: FormValues;
};

const MutationForm = ({ trigger, defaultValues }: MutationFormProps) => {
  const id = defaultValues && 'id' in defaultValues ? (defaultValues['id'] as string) : '';
  const isEditing = !!id;

  const router = useRouter();
  const [autoSync, setAutoSync] = useState(!isEditing);
  const [manualEditing, setManualEditing] = useState(false);

  const { trigger: findExisting } = useMutation(
    '/api/v1/tags/{slug}/check-existing',
    async (
      _,
      {
        arg,
      }: {
        arg: {
          id: string;
          slug: string;
        };
      }
    ) => {
      return await getTags({
        filter: {
          combinator: Combinator.AND,
          not: false,
          rules: [
            {
              combinator: Combinator.UNSPECIFIED,
              not: false,
              rules: [],
              field: 'Id',
              operator: Operator.NOT_EQUAL,
              value: arg.id ?? '',
            },
            {
              combinator: Combinator.UNSPECIFIED,
              not: false,
              rules: [],
              field: 'Slug',
              operator: Operator.EQUAL,
              value: arg.slug,
            },
          ].filter((x) => x.value),
        },
        sortBy: [],
        paging: {
          pageIndex: 0,
          pageSize: 1,
        },
      });
    }
  );

  const creationSchema = yup.object<FormValues>({
    name: yup.string().required().min(4).max(50).label('Name'),
    slug: yup
      .string()
      .required()
      .min(4)
      .max(50)
      .lowercase()
      .test('valid-format', 'Slug must be formatted as kebab-case', (slug: string) => {
        return slug === slugify(slug);
      })
      .test('unique-slug', 'Slug is already taken', async (slug: string) => {
        const { value } = await findExisting({ id: id, slug });

        return value.length === 0;
      })
      .label('Slug'),

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

  const { control, handleSubmit, reset, watch, setValue } = useForm<FormValues>({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onBlur',
  });

  const name = watch('name');

  useEffect(() => {
    if (!!name && autoSync) {
      setValue('slug', slugify(name));
    }
  }, [name, autoSync]);

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

  const makeSlugAsEditable = () => {
    setManualEditing(true);

    if (!isEditing) setAutoSync(false);
  };

  return (
    <FormContainer orientation="horizontal">
      <TextField control={control} required name="name" label="Name" />
      <TextField
        control={control}
        required
        name="slug"
        label="Slug"
        {...(!manualEditing && {
          readOnly: true,
          variant: 'soft',
          sx: {
            '--joy-focus-thickness': '0',
          },
          endDecorator: (
            <IconButton onClick={makeSlugAsEditable}>
              <EditIcon />
            </IconButton>
          ),
        })}
      />
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
