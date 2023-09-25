import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import {
  BookmarkPlusIcon,
  CalendarIcon,
  LayersIcon,
  HeartIcon,
  MessageSquareIcon,
  RocketIcon,
  SmileIcon,
  TagIcon,
} from 'lucide-react';

import { LinkChip, LinkIconButton, LinkTypography } from '@sisa/components';

const PostCard = () => {
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
        <Link href="/blog/posts/abc-xyz/details">
          <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?fm=jpg&fit=crop&w=1024" />
        </Link>
      </AspectRatio>
      <CardContent sx={{ gap: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <LinkChip
            size="sm"
            variant="soft"
            color="primary"
            startDecorator={<LayersIcon />}
            href="/blog/categories/tin-tuc"
          >
            tin-tuc
          </LinkChip>
          <Typography
            level="body-xs"
            sx={{
              '--Icon-fontSize': '1rem',
            }}
            startDecorator={<CalendarIcon />}
          >
            2 days ago
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
            }}
          />
          <Typography
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
          ></Typography>
        </Stack>
        <LinkTypography level="h3" color="primary" href="/blog/posts/abc-xyz/details">
          Cựu điều tra viên Hoàng Văn Hưng kháng cáo kêu oan
        </LinkTypography>

        <Typography level="body-sm" textAlign="justify">
          {`Cựu điều tra viên Hoàng Văn Hưng kháng cáo kêu oan khi bị phạt tù chung thân vì lừa đảo
      "chạy án" 800.000 USD trong vụ án chuyến bay giải cứu.`}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <LinkChip
            size="sm"
            variant="soft"
            color="neutral"
            startDecorator={<TagIcon />}
            href="/blog/tags/tin-tuc"
          >
            tin-tuc
          </LinkChip>
        </Stack>
        <Stack
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
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCard;
