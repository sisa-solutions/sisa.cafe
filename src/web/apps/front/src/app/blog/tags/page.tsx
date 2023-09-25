import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { SearchIcon, TagsIcon } from 'lucide-react';

import TagCard from './_components/tag-card';

const TagsPage = () => {
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <TagCard key={item} />
        ))}
      </Box>
    </Stack>
  );
};

export default TagsPage;
