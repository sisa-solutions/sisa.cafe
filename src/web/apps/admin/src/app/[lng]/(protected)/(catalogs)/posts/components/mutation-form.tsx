'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';

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
import useClientI18n from 'i18n/use-client-i18n';

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

  const { t } = useClientI18n();
  const router = useRouter();
  const [autoSync, setAutoSync] = useState(!isEditing);
  const [manualEditing, setManualEditing] = useState(false);

  const [searchParentCategoryName, setSearchParentCategoryName] = useState('');
  const [searchTagValue, setSearchTagValue] = useState('');

  const { mutateAsync: findExistingAsync } = useMutation({
    mutationKey: ['/api/v1/posts/{slug}/check-existing'],
    mutationFn: async ({ id, slug }: { id: string; slug: string }) => {
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
              value: id ?? '',
            },
            {
              combinator: Combinator.UNSPECIFIED,
              not: false,
              rules: [],
              field: 'Slug',
              operator: Operator.EQUAL,
              value: slug,
            },
          ].filter((x) => x.value),
        },
        sortBy: [],
        paging: {
          pageIndex: 0,
          pageSize: 1,
        },
      });
    },
  });

  const {
    data = {
      value: new Array<CategoryResponse>(),
    },
    isLoading,
  } = useQuery({
    queryKey: ['/api/v1/categories', searchParentCategoryName],
    queryFn: ({ queryKey: [_, queryName] }) =>
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
              value: queryName,
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
      }),
  });

  const {
    data: tags = {
      value: new Array<TagResponse>(),
    },
    isLoading: isLoadingTags,
  } = useQuery({
    queryKey: ['/api/v1/tags', searchTagValue],
    queryFn: ({ queryKey: [_, querySlug] }) =>
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
              value: querySlug,
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
      }),
  });

  const creationSchema = yup.object<FormValues>({
    title: yup.string().required().min(4).max(100).label(t('label.title')),
    slug: yup
      .string()
      .lowercase()
      .required()
      .min(4)
      .max(100)
      .lowercase()
      .test('valid-format', t('validation.slug.format'), (slug: string) => {
        return slug === slugify(slug);
      })
      .test('unique-slug', t('validation.slug.alreadyTaken'), async (slug: string) => {
        const { value } = await findExistingAsync({ id: id, slug });

        return value.length === 0;
      })
      .label(t('label.slug')),

    excerpt: yup.string().required().min(4).max(500).label(t('label.excerpt')),
    content: yup.string().required().min(4).max(5000).label(t('label.content')),
    tagSlugs: yup
      .array()
      .of(yup.string().required().max(50).lowercase())
      .required()
      .min(1)
      .max(3)
      .test('valid-slugs', 'One ore more tags are invalid format', (slugs: string[]) => {
        return !slugs.some((slug) => slug !== slugify(slug));
      })
      .label(t('label.tags')),
    category: yup
      .object({
        id: yup.string().uuid(),
        name: yup.string().min(4).max(100),
      })
      .default(null)
      .required()
      .label(t('label.category')),
    pictures: yup.array<File>().optional().label(t('label.pictures')),
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
        label={t('label.category')}
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
        // @ts-ignore
        onInputChange={onSearchCategoryInputChange}
      />
      <TextField control={control} required name="title" label={t('label.title')} />
      <TextField
        control={control}
        required
        name="slug"
        label={t('label.slug')}
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
      <RichTextField control={control} required name="excerpt" label={t('label.excerpt')} />
      <AutocompleteField
        control={control}
        name="tagSlugs"
        label={t('label.tags')}
        required
        multiple
        freeSolo
        loading={isLoadingTags}
        options={tags.value.map((x) => x.slug)}
        inputValue={searchTagValue}
        // @ts-ignore
        onInputChange={onSearchTagInputChange}
      />
      <FileUploadField
        control={control}
        name="pictures"
        label={t('label.pictures')}
        options={{
          accept: {
            'image/*': [],
          },
          multiple: false,
          maxFiles: 1,
        }}
      />
      <RichTextField control={control} required name="content" label={t('label.content')} />
      <FormActions>
        <SubmitButton submit={onSubmit}>{t('label.save')}</SubmitButton>
        <CancelButton cancel={goBack}>{t('label.cancel')}</CancelButton>
      </FormActions>
    </FormContainer>
  );
};

export default MutationForm;
