'use client';

import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

import { HeartIcon, RocketIcon, SmileIcon, ThumbsUpIcon } from 'lucide-react';
import { useMemo } from 'react';

interface PostReactionProps {
  type: 'HEART' | 'ROCKET' | 'SMILE' | 'LIKE';
  count: number;
  isReacted?: boolean;
}

const getReactionIcon = (type: 'HEART' | 'ROCKET' | 'SMILE' | 'LIKE') => {
  switch (type) {
    case 'HEART':
      return <HeartIcon stroke="red" />;
    case 'ROCKET':
      return <RocketIcon stroke="orange" />;
    case 'SMILE':
      return <SmileIcon stroke="yellow" />;
    case 'LIKE':
    default:
      return <ThumbsUpIcon stroke="yellow" />;
  }
};

const PostReaction = ({ type, count, isReacted = false }: PostReactionProps) => {
  const Icon = useMemo(() => getReactionIcon(type), [type]);

  return (
    <Chip variant={isReacted ? 'solid' : 'soft'} size="lg" startDecorator={Icon}>
      <Typography level="body-sm">{count}</Typography>
    </Chip>
  );
};

export default PostReaction;
