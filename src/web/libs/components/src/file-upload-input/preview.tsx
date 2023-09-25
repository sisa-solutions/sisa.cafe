/* eslint-disable @next/next/no-img-element */

import AspectRatio from '@mui/joy/AspectRatio';

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';

import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Icon from '../icon';

export type FileWithPreview = File & {
  id: string;
  preview: string;
};

type Props = {
  file: FileWithPreview;
  handleRemove: (id: string) => void;
};

const Preview = ({ file, handleRemove }: Props) => {
  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{
        alignItems: 'flex-start',
        boxShadow: 'none',
      }}
    >
      <CardOverflow>
        <AspectRatio
          ratio={16 / 9}
          sx={{
            width: 160,
          }}
        >
          <img src={file.preview} alt={file.name} />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-md">{file.name}</Typography>
        <Typography level="body-sm">{Math.round(file.size / 1024)} KB</Typography>
      </CardContent>
      <IconButton
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ mt: -1, mr: -1 }}
        onClick={() => handleRemove(file.id)}
      >
        <Icon name="x" />
      </IconButton>
    </Card>
  );
};

export default Preview;
