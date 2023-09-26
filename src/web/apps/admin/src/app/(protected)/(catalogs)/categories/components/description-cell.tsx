'use client';

import type { CellContext } from '@tanstack/react-table';

import type { CategoryResponse } from '@sisa/api';

type DescriptionCellProps = CellContext<CategoryResponse, CategoryResponse['description']>;

const DescriptionCell = ({ getValue }: DescriptionCellProps) => (
  <p
    dangerouslySetInnerHTML={{
      __html: getValue() ?? '',
    }}
  ></p>
);

export default DescriptionCell;
