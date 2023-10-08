import Box from '@mui/joy/Box';

import {
  DescriptionList,
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
            title: 'Comments',
            url: '/comments',
          },
          {
            title: 'Details',
          },
        ]}
      />
      <PageHeader>
        <PageTitle>Details</PageTitle>
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
            ></Box>
          </Box>
        </DescriptionList>
      </PageContent>
    </PageLayout>
  );
};

export default NewTagPage;
