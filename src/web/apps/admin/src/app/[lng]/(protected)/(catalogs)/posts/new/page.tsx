import { PageContent, PageHeader, PageTitle } from '@sisa/components';

import { createPost } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';
import getServerI18n from 'i18n/get-server-i18n';

import MutationForm from '../components/mutation-form';

const AddCategoryPage = async () => {
  const { t } = await getServerI18n();

  return (
    <>
      <Breadcrumbs
        items={[
          {
            title: t('label.posts'),
            url: '/posts',
          },
          {
            title: t('label.addPost'),
          },
        ]}
      />
      <PageHeader>
        <PageTitle>{t('label.addPost')}</PageTitle>
      </PageHeader>
      <PageContent>
        <MutationForm trigger={createPost} />
      </PageContent>
    </>
  );
};

export default AddCategoryPage;
