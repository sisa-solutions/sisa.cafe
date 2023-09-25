import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { RichTextInput } from '@sisa/components';
import { CheckCheckIcon, EyeIcon, XIcon } from 'lucide-react';

const CommentBox = () => {
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
        <RichTextInput minRows={2} />
        <Stack direction="row" spacing={2}>
          <Button variant="solid" color="primary" startDecorator={<CheckCheckIcon />}>
            Submit
          </Button>
          <Button variant="soft" color="neutral" startDecorator={<EyeIcon />}>
            Preview
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CommentBox;
