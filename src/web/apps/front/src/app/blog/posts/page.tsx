import Stack from '@mui/joy/Stack';

import { getPublishedPosts, DEFAULT_PAGING_PARAMS } from '@sisa/grpc-api';

import PostCard from './components/post-card';
import TopToolBar from './components/top-toolbar';
import BottomToolBar from './components/bottom-toolbar';

interface PostPageProps {
  searchParams: {
    page?: number;
  };
}

const PostsPage = async ({ searchParams: { page = 1 } }: PostPageProps) => {
  const { value } = await getPublishedPosts({
    paging: {
      ...DEFAULT_PAGING_PARAMS,
      pageIndex: page - 1,
    },
  });

  return (
    <Stack direction="column" spacing={2}>
      <TopToolBar />
      <Stack
        direction="column"
        spacing={2}
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
      <BottomToolBar />
    </Stack>
  );
};

export default PostsPage;
