import Stack from '@mui/joy/Stack';

import { getPublishedPosts } from '@sisa/grpc-api';

import PostCard from './components/post-card';
import Pagination from './components/pagination';

interface PostPageProps {
  searchParams: {
    page?: number;
  };
}

const PostsPage = async ({ searchParams: { page = 1 } }: PostPageProps) => {
  const {
    value,
    paging = {
      itemCount: 0,
      pageIndex: 0,
      pageSize: 0,
      pageCount: 0,
    },
  } = await getPublishedPosts(page - 1);

  const pagingInfo = {
    nextPage: paging.pageIndex + 2,
    previousPage: paging.pageIndex - 2,

    hasNextPage: paging.pageIndex + 1 < paging.pageCount,
    hasPreviousPage: paging.pageIndex > 0,
  };

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <span></span>
        <Pagination {...pagingInfo} />
      </Stack>
      <Stack
        direction="column"
        gap={2}
        sx={{
          // format even/odd
          '& .post-card:nth-child(odd)': {
            backgroundColor: {
              sm: 'background.level1',
            },
          },
        }}
      >
        {value.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <span />
        <Pagination {...pagingInfo} />
      </Stack>
    </Stack>
  );
};

export default PostsPage;
