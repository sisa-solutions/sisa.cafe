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

import { PostResponse } from '@sisa/grpc-api';

const PostCard = ({ title, slug, excerpt, creator, category, tagSlugs }: PostResponse) => {
  return (
    <Card
      className="post-card"
      sx={{
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
      }}
    >
      <AspectRatio
        sx={{
          minWidth: 200,
          display: 'flex',
        }}
      >
        <Link href={`/blog/posts/${slug}/details`}>
          <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?fm=jpg&fit=crop&w=1024" />
        </Link>
      </AspectRatio>
      <CardContent sx={{ gap: 1 }}>
        <Stack direction="row" gap={2} alignItems="center">
          <LinkChip
            size="sm"
            variant="soft"
            color="primary"
            startDecorator={<ComponentIcon />}
            href={`/blog/categories/${category?.slug}/details`}
          >
            {category?.name}
          </LinkChip>
          <Chip size="sm" startDecorator={<CalendarIcon />}>
            {dayUtils(creator?.timestamp).fromNow()}
          </Chip>
          <Box
            sx={{
              flexGrow: 1,
            }}
          />
          {/* <Typography
            endDecorator={
              <IconButton
                variant="soft"
                color="warning"
                size="sm"
                sx={{
                  mt: {
                    xs: 0,
                    sm: -1,
                  },
                  mr: {
                    xs: 0,
                    sm: -1,
                  },
                }}
              >
                <BookmarkPlusIcon />
              </IconButton>
            }
          ></Typography> */}
        </Stack>
        <LinkTypography level="h3" color="primary" href={`/blog/posts/${slug}/details`}>
          {title}
        </LinkTypography>

        <Typography level="body-sm" textAlign="justify" component="div">
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
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
        <Stack
          direction="row"
          gap={2}
          sx={{
            alignItems: 'center',
          }}
        >
          {/* <Stack
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
          </Stack> */}

          {/* <LinkIconButton size="sm" href="/blog/posts/abc-xyz/comments">
            <Badge badgeContent="20" size="sm">
              <MessageSquareIcon />
            </Badge>
          </LinkIconButton> */}
          <Box
            sx={{
              flexGrow: 1,
            }}
          />
          {/* <Typography level="body-sm">2 min read</Typography> */}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCard;
