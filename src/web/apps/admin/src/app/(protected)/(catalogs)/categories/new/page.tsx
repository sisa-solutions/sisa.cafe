import { PageContent, PageHeader, PageTitle } from '@sisa/components';

import Breadcrumbs from 'components/common/breadcrumbs';
import MutationForm from '../components/mutation-form';

import { createCategory, getCategories } from 'api/category-api';

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
