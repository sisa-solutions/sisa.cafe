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

import { findPostById } from '@sisa/api';

import Breadcrumbs from 'components/common/breadcrumbs';

type Props = {
  params: {
    id: string;
  };
};

const NewCategoryPage = async ({ params: { id } }: Props) => {
  const data = await findPostById({
    id,
  });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: 'Posts',
            url: '/posts',
          },
          {
            title: 'Details',
          },
        ]}
      />
      <PageHeader>
        <PageTitle
          endDecorator={
            <Link href={`/posts/${id}/edit`} variant="outlined" fontSize="md" borderRadius="sm">
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
            <Box>Title</Box>
            <Box>{data.title}</Box>
          </Box>
          <Box>
            <Box>Category</Box>
            <Box>{data.category?.name}</Box>
          </Box>
          <Box>
            <Box>Slug</Box>
            <Box>{data.slug}</Box>
          </Box>
          <Box>
            <Box>Excerpt</Box>
            <Box
              dangerouslySetInnerHTML={{
                __html: data.excerpt,
              }}
            ></Box>
          </Box>
          <Box>
            <Box>Content</Box>
            <Box
              dangerouslySetInnerHTML={{
                __html: data.content,
              }}
            ></Box>
          </Box>
          <Box>
            <Box>Comment Count</Box>
            <Box>{data.commentCount}</Box>
          </Box>
          <Box>
            <Box>Created By</Box>
            <Box>{data.creator?.displayName}</Box>
          </Box>
          <Box>
            <Box>Created at</Box>
            <Box>{data.creator?.timestamp?.toLocaleString()}</Box>
          </Box>
          <Box>
            <Box>Updated By</Box>
            <Box>{data.updater?.displayName}</Box>
          </Box>
          <Box>
            <Box>Updated at</Box>
            <Box>{data.updater?.timestamp?.toLocaleString()}</Box>
          </Box>
        </DescriptionList>
      </PageContent>
    </PageLayout>
  );
};

export default NewCategoryPage;
