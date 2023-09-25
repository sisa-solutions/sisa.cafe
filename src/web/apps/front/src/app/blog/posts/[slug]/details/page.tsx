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
import CommentList from '../../_components/comment-list';

const PostDetails = () => {
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
              size="sm"
              variant="soft"
              color="primary"
              startDecorator={<LayersIcon />}
              href="/blog/categories/tin-tuc"
            >
              tin-tuc
            </LinkChip>
            <Chip size="sm" variant="soft" startDecorator={<CalendarIcon />}>
              2 days ago
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
          <LinkTypography level="h2" component="h1" color="primary" href="/blog/posts/abc-xyz">
            Cựu điều tra viên Hoàng Văn Hưng kháng cáo kêu oan
          </LinkTypography>

          <Typography level="body-sm" textAlign="justify">
            {`Cụ thể, lúc xây nhà máy đã có dân cư nằm trong phạm vi 1.000 m tính từ bãi chôn lấp nhưng quá trình khảo sát, lập và trình phê duyệt quy hoạch, đơn vị tư vấn và Sở Xây dựng không đề cập đến. Điều này dẫn đến bãi chôn lấp gần khu dân cư, không đảm bảo khoảng cách an toàn. Nhà máy cũng chưa đúng quy hoạch, không lấy ý kiến các sở ngành liên quan.

Tháng 9/2019, Tỉnh ủy Quảng Ngãi khiển trách ông Trần Em – nguyên chủ tịch huyện Đức Phổ và ông Nguyễn Quốc Tân – Phó giám đốc Sở Tài nguyên Môi trường và một số cán bộ về sai phạm tại dự án trên.

Người dân Phổ Thạnh sau đó được vận động đồng thuận cho nhà máy xử lý rác MD vận hành đến năm 2022 nhằm xử lý 22.500 m3 rác ở bãi rác cũ và thu gom, xử lý chất thải sinh hoạt hàng ngày của Sa Huỳnh. Nhà máy sẽ được di dời sau khi hoàn thành xử lý lượng rác tồn đọng.`}
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
      <CommentList />
    </>
  );
};

export default PostDetails;
