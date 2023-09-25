import Stack from '@mui/joy/Stack';

import PostCard from './_components/post-card';
import TopToolBar from './_components/top-toolbar';
import BottomToolBar from './_components/bottom-toolbar';

const PostsPage = () => {
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <PostCard key={item} />
        ))}
      </Stack>
      <BottomToolBar />
    </Stack>
  );
};

export default PostsPage;
