import { PageContent, PageHeader, PageLayout, PageTitle } from '@sisa/components';

import { findPostById, updatePost } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';

import MutationForm from '../../components/mutation-form';
import getServerI18n from 'i18n/get-server-i18n';

type Props = {
  params: {
    id: string;
  };
};

const EditCategoryPage = async ({ params: { id } }: Props) => {
  const { t } = await getServerI18n();
  const data = await findPostById({ id });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: t('label.categories'),
            url: '/categories',
          },
          {
            title: t('label.editCategory'),
          },
        ]}
      />
      <PageHeader>
        <PageTitle>{t('label.editCategory')}</PageTitle>
      </PageHeader>
      <PageContent>
        <MutationForm
          defaultValues={{
            ...data,
            category: data.category && {
              id: data.category.id,
              name: data.category.name,
            },
          }}
          trigger={updatePost}
        />
      </PageContent>
    </PageLayout>
  );
};

export default EditCategoryPage;
