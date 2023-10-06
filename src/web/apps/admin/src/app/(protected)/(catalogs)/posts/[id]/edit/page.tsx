import { PageContent, PageHeader, PageLayout, PageTitle } from '@sisa/components';

import { findPostById, updatePost } from '@sisa/api';

import Breadcrumbs from 'components/common/breadcrumbs';

import MutationForm from '../../components/mutation-form';

type Props = {
  params: {
    id: string;
  };
};

const EditCategoryPage = async ({ params: { id } }: Props) => {
  const data = await findPostById({ id });

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
            categoryId: data.category?.id || undefined,
          }}
          trigger={updatePost}
        />
      </PageContent>
    </PageLayout>
  );
};

export default EditCategoryPage;
