import { Link } from '@sisa/components';

import type { CellContext, ColumnDefTemplate } from '@tanstack/react-table';

import { type TagResponse } from '@sisa/api';

const DetailsLink: ColumnDefTemplate<CellContext<TagResponse, string>> = ({
  row,
  getValue,
}) => {
  return (
    <Link underline="always" href={`/tags/${row.original.id}/details`}>
      {getValue()}
    </Link>
  );
};

export default DetailsLink;
