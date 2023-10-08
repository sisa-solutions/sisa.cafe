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

import { findTagById } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';

type Props = {
  params: {
    id: string;
  };
};

const NewTagPage = async ({ params: { id } }: Props) => {
  const data = await findTagById({
    id,
  });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: 'Tags',
            url: '/tags',
          },
          {
            title: 'Details',
          },
        ]}
      />
      <PageHeader>
        <PageTitle
          endDecorator={
            <Link href={`/tags/${id}/edit`} variant="outlined" fontSize="md" borderRadius="sm">
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
            <Box>Slug</Box>
            <Box>{data.slug}</Box>
          </Box>
          <Box>
            <Box>Description</Box>
            <Box
              dangerouslySetInnerHTML={{
                __html: data.description ?? '',
              }}
            >
            </Box>
          </Box>
        </DescriptionList>
      </PageContent>
    </PageLayout>
  );
};

export default NewTagPage;
