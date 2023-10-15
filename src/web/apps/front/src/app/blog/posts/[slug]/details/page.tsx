import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { BookmarkPlusIcon, CalendarIcon, LayersIcon, TagIcon } from 'lucide-react';

import { LinkChip, LinkTypography } from '@sisa/components';

import { findPublishedPostBySlug } from '@sisa/grpc-api';

interface PostDetailsProps {
  params: {
    slug: string;
  };
}

const PostDetails = async ({ params: { slug } }: PostDetailsProps) => {
  const { id, title, excerpt, content, category, tags, creator } =
    await findPublishedPostBySlug(slug);

  return (
    <>
      <Card className="post-details">
        <AspectRatio
          ratio={16 / 9}
          sx={{
            borderRadius: 'var(--CardOverflow-radius)',
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,

            margin: 'var(--CardOverflow-offset)',
            marginBottom: '0',
          }}
        >
          <Link href="/blog/posts/abc-xyz">
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?fm=jpg&fit=crop&w=1024" />
          </Link>
        </AspectRatio>
        <CardContent sx={{ gap: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LinkChip
              variant="soft"
              color="primary"
              startDecorator={<LayersIcon />}
              href={`/blog/categories/${category?.slug}`}
            >
              {category?.name}
            </LinkChip>
            <Chip variant="soft" startDecorator={<CalendarIcon />}>
              {creator?.timestamp?.toLocaleString()}
            </Chip>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Typography
              endDecorator={
                <IconButton variant="soft" color="warning" size="sm">
                  <BookmarkPlusIcon />
                </IconButton>
              }
            ></Typography>
          </Stack>
          <LinkTypography
            level="h2"
            component="h1"
            color="primary"
            href={`/blog/posts/${slug}/details`}
          >
            {title}
          </LinkTypography>

          <Typography level="body-sm" textAlign="justify" component="div">
            <p
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            {tags.map((tag) => (
              <LinkChip
                key={tag}
                size="sm"
                variant="soft"
                color="neutral"
                startDecorator={<TagIcon />}
                href={`/blog/tags/${tag}`}
              >
                {tag}
              </LinkChip>
            ))}
          </Stack>
          {/* <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
              }}
            >
              <AvatarGroup
                variant="soft"
                sx={{
                  '--AvatarGroup-gap': '-4px',
                  '--Avatar-size': '1.5rem',
                  '--Avatar-ringSize': '0px',
                }}
              >
                <Avatar alt="heart">
                  <HeartIcon stroke="red" />
                </Avatar>
                <Avatar alt="rocket">
                  <RocketIcon stroke="orange" />
                </Avatar>
                <Avatar alt="smile">
                  <SmileIcon stroke="cyan" />
                </Avatar>
              </AvatarGroup>
              <Typography level="body-sm">1.2k</Typography>
            </Stack>

            <LinkIconButton size="sm" href="/blog/posts/abc-xyz/comments">
              <Badge badgeContent="20" size="sm">
                <MessageSquareIcon />
              </Badge>
            </LinkIconButton>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Typography level="body-sm">2 min read</Typography>
          </Stack> */}
        </CardContent>
      </Card>
      {/* <CommentList /> */}
    </>
  );
};

export default PostDetails;
