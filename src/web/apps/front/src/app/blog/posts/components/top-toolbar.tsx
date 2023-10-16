import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import Pagination from './pagination';

const TopToolBar = () => {
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      {/* <ButtonGroup>
        <LinkButton href="/blog/posts">Relevant</LinkButton>
        <LinkButton href="/blog/posts/latest">Latest</LinkButton>
        <LinkButton href="/blog/posts/top">Top</LinkButton>
      </ButtonGroup> */}
      <Box sx={{ flexGrow: 1 }} />
      {/* <Pagination /> */}
    </Stack>
  );
};
export default TopToolBar;
