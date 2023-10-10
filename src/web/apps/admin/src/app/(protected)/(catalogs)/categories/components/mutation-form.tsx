'use client';

import { useEffect, useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useQuery from 'swr';

import {
  AutocompleteField,
  FormContainer,
  TextField,
  RichTextField,
  FormActions,
  SubmitButton,
  CancelButton,
  FileUploadField,
} from '@sisa/components';

import {
  type CategoryResponse,
  type CategoryInfoResponse,
  type CreateCategoryCommand,
  getCategories,
  Combinator,
  SortDirection,
  Operator,
  DEFAULT_PAGING_PARAMS,
  uploadFile,
  UpdateCategoryCommand,
} from '@sisa/grpc-api';

import { randomId } from '@sisa/utils';

type MutationValues = (CreateCategoryCommand | UpdateCategoryCommand) & {
  parent?: CategoryInfoResponse;
  pictures?: Array<File>;
};

export type MutationFormProps = {
  trigger: (data: MutationValues) => Promise<CategoryResponse>;
  defaultValues?: MutationValues;
};

const validationSchema = yup
  .object<MutationValues>().shape({
    name: yup.string().required().max(100),
    slug: yup.string().required().lowercase().max(100),
    description: yup.string().nullable().max(500),
    pictures: yup.array<File>().nullable(),
    parentId: yup.string().nullable(),
  });

const MutationForm = ({ trigger, defaultValues }: MutationFormProps) => {
  const router = useRouter();
  const { pending } = useFormStatus();
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
  } = useForm<MutationValues>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const watchParentId = watch('parent.id');

  console.log(formState.errors);

  useEffect(() => {
    setValue('parentId', watchParentId);
  }, [watchParentId]);

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
        <SubmitButton submit={onSubmit} disabled={pending} loading={pending}>
          Save
        </SubmitButton>
        <CancelButton cancel={goBack} disabled={pending}>
          Cancel
        </CancelButton>
      </FormActions>
    </FormContainer>
  );
};

export default MutationForm;
