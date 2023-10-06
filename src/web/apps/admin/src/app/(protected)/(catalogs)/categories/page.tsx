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

import { Combinator, Operator, getCategories, sortStringToParams } from '@sisa/api';

import Breadcrumbs from 'components/common/breadcrumbs';

import DataGrid from './components/data-grid';
import Loading from 'components/common/loading';

type CategoriesPageProps = {
  searchParams: {
    name?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
  };
};

const CategoriesPage = async ({
  searchParams: { name = '', pageNumber = 1, pageSize = 10, sortBy = '' },
}: CategoriesPageProps) => {
  const sortingParams = sortStringToParams(sortBy);

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
      combinator: Combinator.COMBINATOR_UNSPECIFIED,
      not: false,
      rules: [
        {
          combinator: Combinator.COMBINATOR_UNSPECIFIED,
          not: false,
          rules: [],
          field: 'Name',
          operator: Operator.OPERATOR_CONTAINS,
          value: name,
        },
      ],
    },
    sortBy: sortingParams,
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
              ...paging,
            }}
          />
        </Suspense>
      </PageContent>
    </>
  );
};

export default CategoriesPage;
