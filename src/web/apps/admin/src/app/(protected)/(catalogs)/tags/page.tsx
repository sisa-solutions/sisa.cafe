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

import { Combinator, Operator, getTags, sortStringToParams } from '@sisa/api';

import Breadcrumbs from 'components/common/breadcrumbs';

import Loading from 'components/common/loading';
import FilterToolbar from './components/filter-toolbar';
import columnDefs from './components/column-defs';

type TagsPageProps = {
  searchParams: {
    name?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
  };
};

const TagsPage = async ({
  searchParams: { name = '', pageNumber = 1, pageSize = 10, sortBy = '' },
}: TagsPageProps) => {
  const sortingParams = sortStringToParams(sortBy);

  const {
    value,
    paging = {
      itemCount: 0,
      pageIndex: 0,
      pageSize,
      pageCount: 0,
    },
  } = await getTags({
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
            title: 'Tags',
          },
        ]}
      />
      <PageHeader>
        <PageToolbar>
          <PageTitle>Tags</PageTitle>
          <Box sx={{ flexGrow: 1 }} />
          <PageActions>
            <LinkButton
              variant="solid"
              color="primary"
              startDecorator={<PlusIcon />}
              href="/tags/new"
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

export default TagsPage;
