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

import { getTags } from 'api/tag-api';
import DataGrid from './components/data-grid';
import Loading from 'components/common/loading';

type TagsPageProps = {
  searchParams: {
    name?: string;
    page?: number;
    pageSize?: number;
  };
};

const TagsPage = async ({
  searchParams: { name = '', page = 1, pageSize = 10 },
}: TagsPageProps) => {
  const {
    value,
    paging = {
      count: 0,
      page,
      pageSize,
      pageCount: 0,
    },
  } = await getTags({
    filter: {
      name: name,
    },
    paging: {
      page,
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
            data={value}
            filter={{
              name: name,
            }}
            paging={{
              count: paging.count,
              page: paging.page,
              pageSize: paging.pageSize,
              pageCount: paging.pageCount,
            }}
          />
        </Suspense>
      </PageContent>
    </>
  );
};

export default TagsPage;
