import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { TagIcon } from 'lucide-react';

import { LinkTypography } from '@sisa/components';
import { type TagResponse } from '@sisa/grpc-api';

interface PageProps {
  tag: TagResponse;
}

const TagCard = ({ tag }: PageProps) => {
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
          href={`/blog/tags/${tag.slug}/details`}
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
          {tag.name}
        </LinkTypography>
        <Divider inset="context" />
        <Typography level="body-md">{tag.description}</Typography>
        <Stack
          direction="row"
          gap={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Typography level="body-sm">{tag.postCount} posts</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TagCard;
