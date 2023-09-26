import { Link } from '@sisa/components';

import type { CellContext, ColumnDefTemplate } from '@tanstack/react-table';

import { type CategoryResponse } from '@sisa/api';

const DetailsLink: ColumnDefTemplate<CellContext<CategoryResponse, string>> = ({
  row,
  getValue,
}) => {
  return (
    <Link underline="always" href={`/categories/${row.original.id}/details`}>
      {getValue()}
    </Link>
  );
};

export default DetailsLink;
