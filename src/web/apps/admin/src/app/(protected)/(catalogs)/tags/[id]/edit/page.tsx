import { PageContent, PageHeader, PageLayout, PageTitle } from '@sisa/components';

import { findTagById, updateTag } from '@sisa/api';

import Breadcrumbs from 'components/common/breadcrumbs';

import MutationForm from '../../components/mutation-form';

type Props = {
  params: {
    id: string;
  };
};

const EditTagPage = async ({ params: { id } }: Props) => {
  const data = await findTagById({ id });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: 'Tags',
            url: '/tags',
          },
          {
            title: 'Edit Tag',
          },
        ]}
      />
      <PageHeader>
        <PageTitle>Edit Tag</PageTitle>
      </PageHeader>
      <PageContent>
        <MutationForm defaultValues={data} trigger={updateTag} />
      </PageContent>
    </PageLayout>
  );
};

export default EditTagPage;
