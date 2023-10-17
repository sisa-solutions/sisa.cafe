import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { Layers3Icon, SearchIcon } from 'lucide-react';

import { Combinator, SortDirection, getCategories } from '@sisa/grpc-api';

import CategoryCard from './components/category-card';

const CategoriesPage = async () => {
  const {
    value,
    paging = {
      itemCount: 0,
    },
  } = await getCategories({
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
    <Stack direction="column" gap={2} sx={{ flex: 1 }}>
      <Stack direction="row" gap={2}>
        <Typography level="body-lg" startDecorator={<Layers3Icon />}>
          Categories
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
        {value.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Box>
    </Stack>
  );
};

export default CategoriesPage;
