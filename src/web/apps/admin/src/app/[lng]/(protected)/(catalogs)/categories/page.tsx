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

import { Combinator, Operator, getCategories, sortStringToParams } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';

import Loading from 'components/common/loading';
import getServerI18n from 'i18n/get-server-i18n';
import DataTable from './components/data-table';

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

  const { t } = await getServerI18n();

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
            title: t('label.categories'),
          },
        ]}
      />
      <PageHeader>
        <PageToolbar>
          <PageTitle>{t('label.categories')}</PageTitle>
          <Box sx={{ flexGrow: 1 }} />
          <PageActions>
            <LinkButton
              variant="solid"
              color="primary"
              startDecorator={<PlusIcon />}
              href="/categories/new"
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

export default CategoriesPage;
