'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import useQuery from 'swr';
import useMutation from 'swr/mutation';

import {
  useForm,
  yupResolver,
  yup,
  AutocompleteField,
  FormContainer,
  TextField,
  RichTextField,
  FormActions,
  SubmitButton,
  CancelButton,
  FileUploadField,
} from '@sisa/form';

import {
  type CategoryResponse,
  type UpdateCategoryCommand,
  type CreateCategoryCommand,
  getCategories,
  Combinator,
  SortDirection,
  Operator,
  DEFAULT_PAGING_PARAMS,
  uploadFile,
} from '@sisa/grpc-api';

import { randomId, slugify } from '@sisa/utils';
import { IconButton } from '@mui/joy';
import { EditIcon } from 'lucide-react';

type AdditionFormValues = {
  parent?: {
    id: string;
    name: string;
  };
  pictures?: File[];
};

type FormValues = (CreateCategoryCommand | UpdateCategoryCommand) & AdditionFormValues;

type MutationFormProps = {
  trigger: (data: CreateCategoryCommand | UpdateCategoryCommand) => Promise<CategoryResponse>;
  defaultValues?: Omit<FormValues, 'parentId'>;
};

const MutationForm = ({ trigger, defaultValues }: MutationFormProps) => {
  const id = defaultValues && 'id' in defaultValues ? (defaultValues['id'] as string) : '';
  const isEditing = !!id;

  const router = useRouter();
  const [searchParentCategoryName, setSearchParentCategoryName] = useState('');
  const [autoSync, setAutoSync] = useState(!isEditing);
  const [manualEditing, setManualEditing] = useState(false);

  const { trigger: findExisting } = useMutation(
    '/api/v1/categories/{slug}/check-existing',
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
      return await getCategories({
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
    parent: yup
      .object({
        id: yup.string().uuid().required(),
        name: yup.string().required().min(4).max(100),
      })
      .optional()
      .partial()
      .label('Parent Category'),
    pictures: yup.array<File>().optional().label('Pictures'),
  });

  const updateSchema = creationSchema.shape({
    id: yup.string().uuid().required(),
  });

  const validationSchema = yup.lazy((values: FormValues) => {
    return 'id' in values ? updateSchema : creationSchema;
  });

  const {
    data = {
      value: new Array<CategoryResponse>(),
    },
    isLoading,
  } = useQuery(['/api/v1/categories', searchParentCategoryName, id], ([_, name, id]) =>
    getCategories({
      filter: {
        combinator: Combinator.AND,
        not: false,
        rules: [
          {
            combinator: Combinator.UNSPECIFIED,
            not: false,
            rules: [],
            field: 'Name',
            operator: Operator.CONTAINS,
            value: name,
          },
          {
            combinator: Combinator.UNSPECIFIED,
            not: false,
            rules: [],
            field: 'Id',
            operator: Operator.NOT_EQUAL,
            value: id,
          },
        ].filter((x) => x.value),
      },
      sortBy: [
        {
          field: 'Name',
          sort: SortDirection.ASC,
        },
      ],
      paging: DEFAULT_PAGING_PARAMS,
    })
  );

  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onBlur',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { parent, pictures = [], ...rest } = data;

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

      await trigger({
        ...rest,
        parentId: parent?.id,
      });

      goBack();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  const name = watch('name');

  useEffect(() => {
    if (!!name && autoSync) {
      setValue('slug', slugify(name));
    }
  }, [name, autoSync]);

  const goBack = () => {
    router.push(`/categories?_s=${randomId()}`);
  };

  const onInputChange = (_: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    setSearchParentCategoryName(newValue);
  };

  const makeSlugAsEditable = () => {
    setManualEditing(true);

    if (!isEditing) setAutoSync(false);
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
      <RichTextField control={control} name="description" label="Description" />
      <FormActions>
        <SubmitButton submit={onSubmit}>Save</SubmitButton>
        <CancelButton cancel={goBack}>Cancel</CancelButton>
      </FormActions>
    </FormContainer>
  );
};

export default MutationForm;
