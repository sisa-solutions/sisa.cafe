import { PageContent, PageHeader, PageTitle } from '@sisa/components';

import Breadcrumbs from 'components/common/breadcrumbs';
import MutationForm from '../components/mutation-form';

import { createCategory } from '@sisa/grpc-api';
import getServerI18n from 'i18n/get-server-i18n';

const AddCategoryPage = async () => {
  const { t } = await getServerI18n();

  return (
    <>
      <Breadcrumbs
        items={[
          {
            title: t('label.categories'),
            url: '/categories',
          },
          {
            title: t('label.addCategory'),
          },
        ]}
      />
      <PageHeader>
        <PageTitle>{t('label.addCategory')}</PageTitle>
      </PageHeader>
      <PageContent>
        <MutationForm trigger={createCategory} />
      </PageContent>
    </>
  );
};

export default AddCategoryPage;
