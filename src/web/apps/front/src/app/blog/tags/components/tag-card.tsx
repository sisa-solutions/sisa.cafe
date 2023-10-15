import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { BookmarkPlusIcon } from 'lucide-react';

const TagCard = () => {
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
        <Typography
          level="title-lg"
          sx={{
            justifyContent: 'space-between',
          }}
          endDecorator={
            <IconButton
              size="sm"
              variant="soft"
              color="warning"
              sx={{
                mt: -1,
                mr: -1,
              }}
            >
              <BookmarkPlusIcon />
            </IconButton>
          }
        >
          JavaScript
        </Typography>
        <Divider inset="context" />
        <Typography level="body-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Typography level="body-sm">200 posts</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TagCard;
