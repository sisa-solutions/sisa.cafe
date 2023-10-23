import { Suspense } from 'react';

import Box from '@mui/joy/Box';

import { PageContent, PageHeader, PageTitle, PageToolbar } from '@sisa/components';

import { Combinator, Operator, getComments, sortStringToParams } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';

import Loading from 'components/common/loading';
import getServerI18n from 'i18n/get-server-i18n';
import DataTable from './components/data-table';

type CommentsPageProps = {
  searchParams: {
    keyword?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
  };
};

const CommentsPage = async ({
  searchParams: { keyword = '', pageNumber = 1, pageSize = 10, sortBy = '' },
}: CommentsPageProps) => {
  const { t } = await getServerI18n();

  const sortingParams = sortStringToParams(sortBy);

  const {
    value,
    paging = {
      itemCount: 0,
      pageIndex: 0,
      pageSize,
      pageCount: 0,
    },
  } = await getComments({
    filter: {
      combinator: Combinator.UNSPECIFIED,
      not: false,
      rules: [
        {
          combinator: Combinator.UNSPECIFIED,
          not: false,
          rules: [],
          field: 'Content',
          operator: Operator.CONTAINS,
          value: keyword,
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
            title: t('label.comments'),
          },
        ]}
      />
      <PageHeader>
        <PageToolbar>
          <PageTitle>{t('label.comments')}</PageTitle>
          <Box sx={{ flexGrow: 1 }} />
        </PageToolbar>
      </PageHeader>
      <PageContent>
        <Suspense fallback={<Loading />}>
          <DataTable data={value} {...paging} />
        </Suspense>
      </PageContent>
    </>
  );
};

export default CommentsPage;
