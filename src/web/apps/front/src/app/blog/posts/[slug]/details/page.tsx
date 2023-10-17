import { dayUtils } from '@sisa/i18n';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { CalendarIcon, ComponentIcon, TagIcon } from 'lucide-react';

import { LinkChip, LinkTypography } from '@sisa/components';

import { findPublishedPostBySlug } from '@sisa/grpc-api';

interface PostDetailsProps {
  params: {
    slug: string;
  };
}

const PostDetails = async ({ params: { slug } }: PostDetailsProps) => {
  const { title, content, category, tagSlugs, creator } = await findPublishedPostBySlug(slug);

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
          <Stack direction="row" gap={2} alignItems="center">
            <LinkChip
              variant="soft"
              color="primary"
              startDecorator={<ComponentIcon />}
              href={`/blog/categories/${category?.slug}/details`}
            >
              {category?.name}
            </LinkChip>
            <Chip variant="soft" startDecorator={<CalendarIcon />}>
              {dayUtils(creator?.timestamp).fromNow()}
            </Chip>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            {/* <Typography
              endDecorator={
                <IconButton variant="soft" color="warning" size="sm">
                  <BookmarkPlusIcon />
                </IconButton>
              }
            ></Typography> */}
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
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Typography>

          <Stack direction="row" gap={1} alignItems="center">
            {tagSlugs.map((tagSlug) => (
              <LinkChip
                key={tagSlug}
                size="sm"
                variant="soft"
                color="neutral"
                startDecorator={<TagIcon />}
                href={`/blog/tags/${tagSlug}/details`}
              >
                {tagSlug}
              </LinkChip>
            ))}
          </Stack>
          {/* <Stack
            direction="row"
            gap={2}
            sx={{
              alignItems: 'center',
            }}
          >
            <Stack
              direction="row"
              gap={1}
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
