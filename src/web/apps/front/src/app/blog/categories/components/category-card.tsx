import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';

import { Layers2Icon } from 'lucide-react';

import { LinkTypography } from '@sisa/components';
import { type CategoryResponse } from '@sisa/grpc-api';

interface PageProps {
  category: CategoryResponse;
}

const CategoryCard = ({ category }: PageProps) => {
  return (
    <Card
      variant="soft"
      color="neutral"
      sx={{
        gridColumn: {
          xs: 'span 12',
          sm: 'span 6',
          md: 'span 4',
          lg: 'span 3',
        },
      }}
    >
      <CardContent
        orientation="vertical"
        sx={{
          gap: 1,
        }}
      >
        <LinkTypography
          level="title-lg"
          // sx={{
          //   justifyContent: 'space-between',
          // }}
          href={`/blog/categories/${category.slug}/details`}
          startDecorator={<Layers2Icon />}
          // endDecorator={
          //   <IconButton
          //     size="sm"
          //     variant="soft"
          //     color="warning"
          //     sx={{
          //       mt: -1,
          //       mr: -1,
          //     }}
          //   >
          //     <BookmarkPlusIcon />
          //   </IconButton>
          // }
        >
          {category.name}
        </LinkTypography>
        <Divider inset="context" />
        <Typography level="body-md" component="div">
          <div dangerouslySetInnerHTML={{ __html: category.description ?? '' }} />
        </Typography>
        {/* <Stack
          direction="row"
          gap={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Typography level="body-sm">{category.postCount} posts</Typography>
        </Stack> */}
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
