import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';

import CommentBox from './comment-box';
import CommentDetails from './comment-details';

const CommentList = () => {
  return (
    <Card>
      <CardContent
        orientation="vertical"
        sx={{
          gap: 2,
        }}
      >
        <CommentBox />
        <Divider
          inset="context"
          sx={{
            '--Divider-thickness': '2px',
          }}
        />
        {[...Array(10)].map((_, index) => (
          <CommentDetails key={index} />
        ))}
      </CardContent>
    </Card>
  );
};

export default CommentList;
