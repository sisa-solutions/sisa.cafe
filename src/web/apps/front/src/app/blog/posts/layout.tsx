import { type ReactNode } from 'react';

import Stack from '@mui/joy/Stack';

import CategoriesWidget from './components/categories-widget';
import TagsWidget from './components/tags-widget';

type Props = {
  children: ReactNode;
};

const PostsLayout = ({ children }: Props) => {
  return (
    <Stack direction="column" sx={{ flex: 1 }}>
      <Stack direction="row" gap={2}>
        <Stack
          direction="column"
          gap={2}
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Stack>
        <Stack direction="column" gap={2}>
          <CategoriesWidget />
          <TagsWidget />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostsLayout;
