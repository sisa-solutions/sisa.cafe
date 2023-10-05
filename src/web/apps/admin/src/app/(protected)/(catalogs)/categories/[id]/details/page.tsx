import Box from '@mui/joy/Box';

import { PencilLine } from 'lucide-react';

import {
  DescriptionList,
  Link,
  PageContent,
  PageHeader,
  PageLayout,
  PageTitle,
} from '@sisa/components';

import { findCategoryById } from '@sisa/api';

import Breadcrumbs from 'components/common/breadcrumbs';

type Props = {
  params: {
    id: string;
  };
};

const NewCategoryPage = async ({ params: { id } }: Props) => {
  const data = await findCategoryById({
    id,
  });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: 'Categories',
            url: '/categories',
          },
          {
            title: 'Details',
          },
        ]}
      />
      <PageHeader>
        <PageTitle
          endDecorator={
            <Link
              href={`/categories/${id}/edit`}
              variant="outlined"
              fontSize="md"
              borderRadius="sm"
            >
              <PencilLine />
            </Link>
          }
        >
          Details
        </PageTitle>
      </PageHeader>
      <PageContent>
        <DescriptionList orientation="horizontal">
          <Box>
            <Box>Name</Box>
            <Box>{data.name}</Box>
          </Box>
          <Box>
            <Box>Parent</Box>
            <Box>{data.parent?.name}</Box>
          </Box>
          <Box>
            <Box>Slug</Box>
            <Box>{data.slug}</Box>
          </Box>
          <Box>
            <Box>Description</Box>
            <Box>{data.description}</Box>
          </Box>
        </DescriptionList>
      </PageContent>
    </PageLayout>
  );
};

export default NewCategoryPage;
