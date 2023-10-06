import { Link } from '@sisa/components';

import type { CellContext, ColumnDefTemplate } from '@tanstack/react-table';

import type { PostResponse } from '@sisa/api';

const DetailsLink: ColumnDefTemplate<CellContext<PostResponse, string>> = ({
  row,
  getValue,
}) => {
  return (
    <Link underline="always" href={`/posts/${row.original.id}/details`}>
      {getValue()}
    </Link>
  );
};

export default DetailsLink;
