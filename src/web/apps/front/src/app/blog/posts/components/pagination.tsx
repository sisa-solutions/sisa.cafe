import ButtonGroup from '@mui/joy/ButtonGroup';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { LinkIconButton } from '@sisa/components';

interface PageProps {
  nextPage: number;
  previousPage: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const Pagination = ({ nextPage, previousPage, hasNextPage, hasPreviousPage }: PageProps) => {
  return (
    <ButtonGroup>
      <LinkIconButton
        color="neutral"
        href={`/blog/posts?page=${previousPage}`}
        disabled={!hasPreviousPage}
      >
        <ChevronLeftIcon />
      </LinkIconButton>
      <LinkIconButton color="neutral" href={`/blog/posts?page=${nextPage}`} disabled={!hasNextPage}>
        <ChevronRightIcon />
      </LinkIconButton>
    </ButtonGroup>
  );
};
export default Pagination;
