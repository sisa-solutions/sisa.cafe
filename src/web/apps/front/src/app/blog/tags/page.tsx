import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { SearchIcon, TagsIcon } from 'lucide-react';

import { Combinator, SortDirection, getTags } from '@sisa/grpc-api';

import TagCard from './components/tag-card';

const TagsPage = async () => {
  const {
    value,
    paging = {
      itemCount: 0,
    },
  } = await getTags({
    filter: {
      combinator: Combinator.COMBINATOR_AND,
      not: false,
      rules: [],
    },
    sortBy: [
      {
        field: 'Name',
        sort: SortDirection.SORT_DIRECTION_DESC,
      },
    ],
    paging: {
      pageIndex: 0,
      pageSize: 10,
    },
  });

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2}>
        <Typography level="body-lg" startDecorator={<TagsIcon />}>
          Tags
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Input
          placeholder="Search..."
          sx={{
            '--Input-radius': '24px',
          }}
          endDecorator={
            <IconButton>
              <SearchIcon />
            </IconButton>
          }
        />
      </Stack>
      <Box display="grid" gap={2} gridTemplateColumns="repeat(12, 1fr)">
        {value.map((tag) => (
          <TagCard key={tag.id} tag={tag} />
        ))}
      </Box>
    </Stack>
  );
};

export default TagsPage;
