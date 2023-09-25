import { PageContent, PageHeader, PageTitle } from '@sisa/components';

import Breadcrumbs from 'components/common/breadcrumbs';
import MutationForm from '../_components/mutation-form';

import { createCategory } from 'api/category-api';

const AddCategoryPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          {
            title: 'Categories',
            url: '/categories',
          },
          {
            title: 'Add Category',
          },
        ]}
      />
      <PageHeader>
        <PageTitle>Add Category</PageTitle>
      </PageHeader>
      <PageContent>
        <MutationForm trigger={createCategory} />
      </PageContent>
    </>
  );
};

export default AddCategoryPage;
