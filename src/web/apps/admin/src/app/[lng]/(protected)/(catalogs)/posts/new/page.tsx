import { PageContent, PageHeader, PageTitle } from '@sisa/components';

import Breadcrumbs from 'components/common/breadcrumbs';
import MutationForm from '../components/mutation-form';

import { createPost } from '@sisa/grpc-api';

const AddCategoryPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          {
            title: 'Posts',
            url: '/posts',
          },
          {
            title: 'Add Post',
          },
        ]}
      />
      <PageHeader>
        <PageTitle>Add Post</PageTitle>
      </PageHeader>
      <PageContent>
        <MutationForm trigger={createPost} />
      </PageContent>
    </>
  );
};

export default AddCategoryPage;
