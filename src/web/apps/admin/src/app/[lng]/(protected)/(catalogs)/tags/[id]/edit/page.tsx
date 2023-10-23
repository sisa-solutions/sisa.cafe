import { PageContent, PageHeader, PageLayout, PageTitle } from '@sisa/components';

import { findTagById, updateTag } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';
import getServerI18n from 'i18n/get-server-i18n';

import MutationForm from '../../components/mutation-form';

type Props = {
  params: {
    id: string;
  };
};

const EditTagPage = async ({ params: { id } }: Props) => {
  const { t } = await getServerI18n();
  const data = await findTagById({ id });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: t('label.tags'),
            url: '/tags',
          },
          {
            title: t('label.editTag'),
          },
        ]}
      />
      <PageHeader>
        <PageTitle>{t('label.editTag')}</PageTitle>
      </PageHeader>
      <PageContent>
        <MutationForm defaultValues={data} trigger={updateTag} />
      </PageContent>
    </PageLayout>
  );
};

export default EditTagPage;
