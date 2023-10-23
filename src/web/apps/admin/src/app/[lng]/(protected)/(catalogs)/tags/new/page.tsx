import { PageContent, PageHeader, PageTitle } from '@sisa/components';

import { createTag } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';
import MutationForm from '../components/mutation-form';
import getServerI18n from 'i18n/get-server-i18n';

const AddTagPage = async () => {
  const { t } = await getServerI18n();

  return (
    <>
      <Breadcrumbs
        items={[
          {
            title: t('label.tags'),
            url: '/tags',
          },
          {
            title: t('label.addTag'),
          },
        ]}
      />
      <PageHeader>
        <PageTitle>{t('label.addTag')}</PageTitle>
      </PageHeader>
      <PageContent>
        <MutationForm trigger={createTag} />
      </PageContent>
    </>
  );
};

export default AddTagPage;
