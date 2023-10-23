import { PageContent, PageHeader, PageLayout, PageTitle } from '@sisa/components';

import { findCategoryById, updateCategory } from '@sisa/grpc-api';

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
  const data = await findCategoryById({ id });

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
            parent: data.parent && {
              id: data.parent.id,
              name: data.parent.name,
            },
          }}
          trigger={updateCategory}
        />
      </PageContent>
    </PageLayout>
  );
};

export default EditCategoryPage;
