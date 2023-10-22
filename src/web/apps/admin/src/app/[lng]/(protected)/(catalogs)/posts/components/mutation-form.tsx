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
  type PostResponse,
  type CreatePostCommand,
  type UpdatePostCommand,
  type TagResponse,
  getCategories,
  getPosts,
  Combinator,
  SortDirection,
  Operator,
  DEFAULT_PAGING_PARAMS,
  uploadFile,
  getTags,
} from '@sisa/grpc-api';

import { randomId, slugify } from '@sisa/utils';
import IconButton from '@mui/joy/IconButton';
import { EditIcon } from 'lucide-react';

type AdditionFormValues = {
  category?: {
    id: string;
    name: string;
  };
  pictures?: File[];
};

type FormValues = (CreatePostCommand | UpdatePostCommand) & AdditionFormValues;

type MutationFormProps = {
  trigger: (data: CreatePostCommand | UpdatePostCommand) => Promise<PostResponse>;
  defaultValues?: Omit<FormValues, 'categoryId'>;
};

const MutationForm = ({ trigger, defaultValues }: MutationFormProps) => {
  const id = defaultValues && 'id' in defaultValues ? (defaultValues['id'] as string) : '';
  const isEditing = !!id;

  const router = useRouter();
  const [autoSync, setAutoSync] = useState(!isEditing);
  const [manualEditing, setManualEditing] = useState(false);

  const [searchParentCategoryName, setSearchParentCategoryName] = useState('');
  const [searchTagValue, setSearchTagValue] = useState('');

  const { trigger: findExisting } = useMutation(
    '/api/v1/posts/{slug}/check-existing',
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
      return await getPosts({
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

  const {
    data = {
      value: new Array<CategoryResponse>(),
    },
    isLoading,
  } = useQuery(['/api/v1/categories', searchParentCategoryName], ([_, name]) =>
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
        ],
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

  const {
    data: tags = {
      value: new Array<TagResponse>(),
    },
    isLoading: isLoadingTags,
  } = useQuery(['/api/v1/tags', searchTagValue], ([_, slug]) =>
    getTags({
      filter: {
        combinator: Combinator.AND,
        not: false,
        rules: [
          {
            combinator: Combinator.UNSPECIFIED,
            not: false,
            rules: [],
            field: 'Slug',
            operator: Operator.CONTAINS,
            value: slug,
          },
        ],
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

  const creationSchema = yup.object<FormValues>({
    title: yup.string().required().min(4).max(100).label('Title'),
    slug: yup
      .string()
      .lowercase()
      .required()
      .min(4)
      .max(100)
      .lowercase()
      .test('valid-format', 'Slug must be formatted as kebab-case', (slug: string) => {
        return slug === slugify(slug);
      })
      .test('unique-slug', 'Slug is already taken', async (slug: string) => {
        const { value } = await findExisting({ id: id, slug });

        return value.length === 0;
      })
      .label('Slug'),

    excerpt: yup.string().required().min(4).max(500).label('Excerpt'),
    content: yup.string().required().min(4).max(5000).label('Content'),
    tagSlugs: yup
      .array()
      .of(yup.string().required().max(50).lowercase())
      .required()
      .min(1)
      .max(3)
      .test('valid-slugs', 'One ore more tags are invalid format', (slugs: string[]) => {
        return !slugs.some((slug) => slug !== slugify(slug));
      })
      .label('Tags'),
    category: yup
      .object({
        id: yup.string().uuid(),
        name: yup.string().min(4).max(100),
      })
      .default(null)
      .required()
      .label('Category'),
    pictures: yup.array<File>().optional().label('Pictures'),
  });

  const updateSchema = creationSchema.shape({
    id: yup.string().uuid().required(),
  });

  const validationSchema = yup.lazy((values: FormValues) => {
    return 'id' in values ? updateSchema : creationSchema;
  });

  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onBlur',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { category, pictures = [], ...rest } = data;

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
        categoryId: category?.id,
      });

      goBack();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  const name = watch('title');

  useEffect(() => {
    if (!!name && autoSync) {
      setValue('slug', slugify(name));
    }
  }, [name, autoSync]);

  const goBack = () => {
    router.push(`/posts?_s=${randomId()}`);
  };

  const onSearchCategoryInputChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => {
    setSearchParentCategoryName(newValue);
  };

  const onSearchTagInputChange = (_: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    setSearchTagValue(newValue);
  };

  const makeSlugAsEditable = () => {
    setManualEditing(true);

    if (!isEditing) setAutoSync(false);
  };

  return (
    <FormContainer orientation="horizontal">
      <AutocompleteField
        control={control}
        name="category"
        label="Category"
        required
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
        onInputChange={onSearchCategoryInputChange}
      />
      <TextField control={control} required name="title" label="Title" />
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
      <RichTextField control={control} required name="excerpt" label="Excerpt" />
      <AutocompleteField
        control={control}
        name="tagSlugs"
        label="Tags"
        required
        multiple
        freeSolo
        loading={isLoadingTags}
        options={tags.value.map((x) => x.slug)}
        inputValue={searchTagValue}
        onInputChange={onSearchTagInputChange}
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
      <RichTextField control={control} required name="content" label="Content" />
      <FormActions>
        <SubmitButton submit={onSubmit}>Save</SubmitButton>
        <CancelButton cancel={goBack}>Cancel</CancelButton>
      </FormActions>
    </FormContainer>
  );
};

export default MutationForm;
