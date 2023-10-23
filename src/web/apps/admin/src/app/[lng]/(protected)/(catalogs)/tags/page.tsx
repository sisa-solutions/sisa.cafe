import { Suspense } from 'react';

import Box from '@mui/joy/Box';

import { PlusIcon } from 'lucide-react';

import { PageContent, PageHeader, PageTitle, PageToolbar, PageActions } from '@sisa/components';
import { LinkButton } from '@sisa/next';

import { Combinator, Operator, getTags, sortStringToParams } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';

import Loading from 'components/common/loading';
import DataTable from './components/data-table';
import getServerI18n from 'i18n/get-server-i18n';

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
  } = await getTags({
    filter: {
      combinator: Combinator.UNSPECIFIED,
      not: false,
      rules: [
        {
          combinator: Combinator.UNSPECIFIED,
          not: false,
          rules: [],
          field: 'Name',
          operator: Operator.CONTAINS,
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
            title: t('label.tags'),
          },
        ]}
      />
      <PageHeader>
        <PageToolbar>
          <PageTitle>{t('label.tags')}</PageTitle>
          <Box sx={{ flexGrow: 1 }} />
          <PageActions>
            <LinkButton
              variant="solid"
              color="primary"
              startDecorator={<PlusIcon />}
              href="/tags/new"
            >
              {t('label.create')}
            </LinkButton>
          </PageActions>
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

export default TagsPage;
