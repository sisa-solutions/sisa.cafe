import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import Pagination from './pagination';

const BottomToolBar = () => {
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
      <Typography level="body-md">10/100 posts</Typography>
      <Pagination />
    </Stack>
  );
};
export default BottomToolBar;
