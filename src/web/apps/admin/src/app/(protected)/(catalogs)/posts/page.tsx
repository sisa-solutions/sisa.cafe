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
  DataGrid,
} from '@sisa/components';

import { Combinator, Operator, PostStatus, getPosts, sortStringToParams } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';

import Loading from 'components/common/loading';
import FilterToolbar from './components/filter-toolbar';
import columnDefs from './components/column-defs';

type PostsPageProps = {
  searchParams: {
    name?: string;
    status?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
  };
};

const CategoriesPage = async ({
  searchParams: { name = '', status = '', pageNumber = 1, pageSize = 10, sortBy = '' },
}: PostsPageProps) => {
  const sortingParams = sortStringToParams(sortBy);

  const {
    value,
    paging = {
      itemCount: 0,
      pageIndex: 0,
      pageSize,
      pageCount: 0,
    },
  } = await getPosts({
    filter: {
      combinator: Combinator.AND,
      not: false,
      rules: [
        {
          combinator: Combinator.UNSPECIFIED,
          not: false,
          rules: [],
          field: 'Title',
          operator: Operator.CONTAINS,
          value: name,
        },
        {
          combinator: Combinator.UNSPECIFIED,
          not: false,
          rules: [],
          field: 'Status',
          operator: Operator.EQUAL,
          value: status,
        },
      ].filter((rule) => rule.value),
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
            title: 'Posts',
          },
        ]}
      />
      <PageHeader>
        <PageToolbar>
          <PageTitle>Posts</PageTitle>
          <Box sx={{ flexGrow: 1 }} />
          <PageActions>
            <LinkButton
              variant="solid"
              color="primary"
              startDecorator={<PlusIcon />}
              href="/posts/new"
            >
              Create
            </LinkButton>
          </PageActions>
        </PageToolbar>
      </PageHeader>
      <PageContent>
        <Suspense fallback={<Loading />}>
          <DataGrid
            columns={columnDefs}
            data={value}
            pageIndex={paging.pageIndex}
            pageSize={paging.pageSize}
            itemCount={paging.itemCount}
            pageCount={paging.pageCount}
            enableRowSelection
            enableMultiSort
            slots={{
              toolbar: (
                <FilterToolbar
                  defaultValues={{
                    name,
                  }}
                />
              ),
            }}
          />
        </Suspense>
      </PageContent>
    </>
  );
};

export default CategoriesPage;
