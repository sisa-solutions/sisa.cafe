import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';

import { LinkChip, LinkTypography } from '@sisa/components';

import { TagIcon, TagsIcon } from 'lucide-react';

const TagsWidget = () => {
  return (
    <Card
      sx={{
        width: '320px',
        display: { xs: 'none', sm: 'none', md: 'flex' },
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <CardContent
        sx={{
          gap: 2,
        }}
      >
        <LinkTypography level="body-lg" startDecorator={<TagsIcon />} href="/blog/tags">
          Tags
        </LinkTypography>
        <Stack useFlexGap flexWrap="wrap" direction="row" spacing={1}>
          {[21, 22, 23, 24, 25, 26, 27, 28].map((item) => (
            <LinkChip
              key={item}
              color="primary"
              startDecorator={<TagIcon />}
              href="/blog/tags/tin-tuc"
            >
              tin-tuc
            </LinkChip>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TagsWidget;
