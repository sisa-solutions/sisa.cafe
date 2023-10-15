import ButtonGroup from '@mui/joy/ButtonGroup';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { LinkIconButton } from '@sisa/components';

const Pagination = () => {
  return (
    <ButtonGroup>
      <LinkIconButton color="neutral" href="/blog/posts?page=1">
        <ChevronLeftIcon />
      </LinkIconButton>
      <LinkIconButton color="neutral" href="/blog/posts?page=3">
        <ChevronRightIcon />
      </LinkIconButton>
    </ButtonGroup>
  );
};
export default Pagination;
