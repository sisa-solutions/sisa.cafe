import { PageContent, PageHeader, PageLayout, PageTitle } from '@sisa/components';

import { findCategoryById, updateCategory } from '@sisa/api';

import Breadcrumbs from 'components/common/breadcrumbs';

import MutationForm from '../../components/mutation-form';

type Props = {
  params: {
    id: string;
  };
};

const EditCategoryPage = async ({ params: { id } }: Props) => {
  const data = await findCategoryById({ id });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: 'Categories',
            url: '/categories',
          },
          {
            title: 'Edit Category',
          },
        ]}
      />
      <PageHeader>
        <PageTitle>Edit Category</PageTitle>
      </PageHeader>
      <PageContent>
        <MutationForm
          defaultValues={{
            ...data,
            parentId: data.parent?.id || undefined,
          }}
          trigger={updateCategory}
        />
      </PageContent>
    </PageLayout>
  );
};

export default EditCategoryPage;
