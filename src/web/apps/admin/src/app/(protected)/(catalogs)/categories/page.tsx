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
import DataGrid from './components/data-grid';
import Loading from 'components/common/loading';

type CategoriesPageProps = {
  searchParams: {
    name?: string;
    pageNumber?: number;
    pageSize?: number;
  };
};

const CategoriesPage = async ({
  searchParams: { name = '', pageNumber = 1, pageSize = 10 },
}: CategoriesPageProps) => {
  const {
    value,
    paging = {
      itemCount: 0,
      pageIndex: 0,
      pageSize,
      pageCount: 0,
    },
  } = await getCategories({
    filter: {
      name: name,
    },
    paging: {
      pageIndex: pageNumber - 1,
      pageSize,
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
        <PageToolbar>
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
          <DataGrid
            data={value}
            filter={{
              name: name,
            }}
            paging={{
              ...paging
            }}
          />
        </Suspense>
      </PageContent>
    </>
  );
};

export default CategoriesPage;
