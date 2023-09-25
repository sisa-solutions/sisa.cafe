import { Suspense } from 'react';

import Box from '@mui/joy/Box';

import { PlusIcon } from 'lucide-react';

import {
  PageContent,
  PageHeader,
  PageTitle,
  PageToolbar,
  PageActions,
  LinkButton,
} from '@sisa/components';

import Breadcrumbs from 'components/common/breadcrumbs';

import { getCategories } from 'api/category-api';
import DataGrid from './_components/data-grid';
import Loading from 'components/common/loading';

const CategoriesPage = async ({ searchParams: { keyword } }) => {
  const { value } = await getCategories({
    filter: {
      keyword: keyword ?? '',
    },
    paging: {
      page: 1,
      pageSize: 10,
    },
  });

  return (
    <>
      <Breadcrumbs
        items={[
          {
            title: 'Categories',
          },
        ]}
      />
      <PageHeader>
        <PageToolbar defaultValue={keyword ?? ''}>
          <PageTitle>Categories</PageTitle>
          <Box sx={{ flexGrow: 1 }} />
          <PageActions>
            <LinkButton
              variant="solid"
              color="primary"
              startDecorator={<PlusIcon />}
              href="/categories/new"
            >
              Create
            </LinkButton>
          </PageActions>
        </PageToolbar>
      </PageHeader>
      <PageContent>
        <Suspense fallback={<Loading />}>
          <DataGrid data={value} />
        </Suspense>
      </PageContent>
    </>
  );
};

export default CategoriesPage;
