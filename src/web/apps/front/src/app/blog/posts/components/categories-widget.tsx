import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import { Tooltip } from '@mui/joy';

import { Layers3Icon, Layers2Icon } from 'lucide-react';

import { LinkChip, LinkTypography } from '@sisa/components';

import { getCategories, Combinator, SortDirection } from '@sisa/grpc-api';

const CategoriesWidget = async () => {
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
    <Card
      sx={{
        width: '320px',
        display: { xs: 'none', sm: 'none', md: 'flex' },
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <CardContent
        sx={{
          gap: 2,
        }}
      >
        <LinkTypography level="body-lg" startDecorator={<Layers3Icon />} href="/blog/categories">
          Categories ({paging.itemCount})
        </LinkTypography>
        <Stack useFlexGap flexWrap="wrap" direction="row" spacing={1}>
          {value.map((tag) => (
            <Tooltip key={tag.id} title={tag.name}>
              <LinkChip
                color="primary"
                startDecorator={<Layers2Icon />}
                href={`/blog/categories/${tag.slug}`}
              >
                {tag.slug}
              </LinkChip>
            </Tooltip>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CategoriesWidget;
