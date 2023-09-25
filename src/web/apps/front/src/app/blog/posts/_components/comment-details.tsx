import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { HeartIcon, MessagesSquareIcon } from 'lucide-react';

import ReplyBox from './reply-box';

const CommentDetails = () => {
  return (
    <Stack direction="row" spacing={2} className="comment-details">
      <Stack direction="column" spacing={1} alignItems="center">
        <Avatar
          alt="heart"
          size="lg"
          src="https://pbs.twimg.com/profile_images/1544395642914897920/k29Ck7At_400x400.jpg"
        />
      </Stack>
      <Stack direction="column" spacing={1}>
        <Typography
          level="body-md"
          fontWeight="600"
          endDecorator={<Typography level="body-sm">3 days ago</Typography>}
        >
          Sang Au
        </Typography>
        <Typography level="body-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eu lorem et
          ultricies. In porta lorem at dui semper porttitor. Nullam quis cursus dui. Cras tincidunt
          vehicula tellus eu facilisis. Donec nisi turpis, iaculis et arcu a, aliquet ultrices nisl.
          Nam in pharetra
        </Typography>
        <ButtonGroup variant="plain" spacing={2} size="sm">
          <Button startDecorator={<HeartIcon />}>2 likes</Button>
          <Button startDecorator={<MessagesSquareIcon />}>Reply</Button>
        </ButtonGroup>
        <ReplyBox />
      </Stack>
    </Stack>
  );
};

export default CommentDetails;
