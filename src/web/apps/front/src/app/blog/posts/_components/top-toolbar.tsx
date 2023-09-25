import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';

import { LinkButton } from '@sisa/components';

import Pagination from './pagination';

const TopToolBar = () => {
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <ButtonGroup>
        <LinkButton href="/blog/posts">Relevant</LinkButton>
        <LinkButton href="/blog/posts/latest">Latest</LinkButton>
        <LinkButton href="/blog/posts/top">Top</LinkButton>
      </ButtonGroup>
      <Pagination />
    </Stack>
  );
};
export default TopToolBar;
