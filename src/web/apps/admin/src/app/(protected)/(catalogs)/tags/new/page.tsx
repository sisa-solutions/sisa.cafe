import { PageContent, PageHeader, PageTitle } from '@sisa/components';

import { createTag } from '@sisa/api';

import Breadcrumbs from 'components/common/breadcrumbs';
import MutationForm from '../components/mutation-form';

const AddTagPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          {
            title: 'Tags',
            url: '/tags',
          },
          {
            title: 'Add Tag',
          },
        ]}
      />
      <PageHeader>
        <PageTitle>Add Tag</PageTitle>
      </PageHeader>
      <PageContent>
        <MutationForm trigger={createTag} />
      </PageContent>
    </>
  );
};

export default AddTagPage;
