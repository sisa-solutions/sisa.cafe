import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

import { RichTextInput } from '@sisa/form';
import { CheckCheckIcon, EyeIcon, XIcon } from 'lucide-react';

const ReplyBox = () => {
  return (
    <Stack direction="column" spacing={1} className="reply-box">
      <RichTextInput minRows={2} />
      <Stack direction="row" spacing={2}>
        <Button variant="solid" color="primary" startDecorator={<CheckCheckIcon />}>
          Submit
        </Button>
        <Button variant="soft" color="neutral" startDecorator={<EyeIcon />}>
          Preview
        </Button>
        <Button variant="plain" color="neutral" startDecorator={<XIcon />}>
          Dismiss
        </Button>
      </Stack>
    </Stack>
  );
};

export default ReplyBox;
