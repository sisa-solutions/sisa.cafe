import { type ReactNode } from 'react';

import Stack from '@mui/joy/Stack';

import CategoriesWidget from './_components/categories-widget';
import TagsWidget from './_components/tags-widget';
import Box from '@mui/joy/Box';

type Props = {
  children: ReactNode;
};

const PostsLayout = ({ children }: Props) => {
  return (
    <Stack direction="column">
      <Stack direction="row" spacing={2}>
        <Stack direction="column" spacing={2}>
          {children}
        </Stack>
        <Stack direction="column">
          <CategoriesWidget />
          <TagsWidget />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostsLayout;
