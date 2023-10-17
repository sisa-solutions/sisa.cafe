import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { TagIcon } from 'lucide-react';

import { findCategoryBySlug, getPublishedPostsByCategorySlug } from '@sisa/grpc-api';
import PostCard from '../../../posts/components/post-card';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: number;
  };
}

const CategoryDetailsPage = async ({ params: { slug }, searchParams: { page = 1 } }: PageProps) => {
  const [category, { value }] = await Promise.all([
    findCategoryBySlug(slug),
    getPublishedPostsByCategorySlug(page - 1, slug),
  ]);

  return (
    <Stack direction="column" gap={2}>
      <Card variant="plain">
        <CardContent
          orientation="vertical"
          sx={{
            gap: 1,
          }}
        >
          <Typography
            level="title-lg"
            // sx={{
            //   justifyContent: 'space-between',
            // }}
            startDecorator={<TagIcon />}
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
          </Typography>
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
            <Typography level="body-sm">{tag.postCount} posts</Typography>
          </Stack> */}
        </CardContent>
      </Card>

      <Stack
        direction="column"
        gap={2}
        sx={{
          // format even/odd
          '& .post-card:nth-child(odd)': {
            backgroundColor: {
              sm: 'background.level1',
            },
          },
        }}
      >
        {value.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </Stack>
    </Stack>
  );
};

export default CategoryDetailsPage;
