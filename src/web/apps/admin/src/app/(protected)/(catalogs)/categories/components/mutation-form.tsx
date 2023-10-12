'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import useQuery from 'swr';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as y from 'yup';

import {
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
  getCategories,
  Combinator,
  SortDirection,
  Operator,
  DEFAULT_PAGING_PARAMS,
  uploadFile,
  CreateCategoryCommand,
  UpdateCategoryCommand,
} from '@sisa/grpc-api';

import { randomId } from '@sisa/utils';

const createSchema = y.object({
  name: y.string().required().min(4).max(100),
  slug: y.string().required().min(4).max(100),
  description: y.string().max(500).optional(),
  parentId: y.string().optional(),
  parent: y
    .object({
      id: y.string().uuid().required(),
      name: y.string().required().min(4).max(100),
    })
    .optional()
    .partial(),
  pictures: y.array<File, File>().optional(),
});

const updateSchema = y.object({
  id: y.string().uuid().notRequired(),
  name: y.string().required().min(4).max(100),
  slug: y.string().required().min(4).max(100),
  description: y.string().max(500).optional(),
  parentId: y.string().optional(),
  parent: y
    .object({
      id: y.string().uuid().required(),
      name: y.string().required().min(4).max(100),
    })
    .optional()
    .partial(),
  pictures: y.array<File, File>().optional(),
});

const validationSchema = y.lazy((values) => {
  if ('id' in values) {
    return updateSchema;
  }

  return createSchema;
});

type FormValues = y.InferType<typeof validationSchema>;

type MutationFormProps = {
  trigger: (data: CreateCategoryCommand | UpdateCategoryCommand) => Promise<CategoryResponse>;
  defaultValues?: FormValues;
};

const MutationForm = ({ trigger, defaultValues }: MutationFormProps) => {
  const router = useRouter();
  const [searchParentCategoryName, setSearchParentCategoryName] = useState('');

  const {
    data = {
      value: new Array<CategoryResponse>(),
    },
    isLoading,
  } = useQuery(['/api/v1/categories', searchParentCategoryName], ([_, name]) =>
    getCategories({
      filter: {
        combinator: Combinator.COMBINATOR_AND,
        not: false,
        rules: [
          {
            combinator: Combinator.COMBINATOR_UNSPECIFIED,
            not: false,
            rules: [],
            field: 'Name',
            operator: Operator.OPERATOR_CONTAINS,
            value: name,
          },
        ],
      },
      sortBy: [
        {
          field: 'Name',
          sort: SortDirection.SORT_DIRECTION_ASC,
        },
      ],
      paging: DEFAULT_PAGING_PARAMS,
    })
  );

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState = { errors: {} },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
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

  const goBack = () => {
    router.push(`/categories?_s=${randomId()}`);
  };

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
        <SubmitButton submit={onSubmit}>
          Save
        </SubmitButton>
        <CancelButton cancel={goBack}>
          Cancel
        </CancelButton>
      </FormActions>
    </FormContainer>
  );
};

export default MutationForm;
