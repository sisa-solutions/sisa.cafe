'use client';

import type { CellContext } from '@tanstack/react-table';

import type { TagResponse } from '@sisa/api';

type DescriptionCellProps = CellContext<TagResponse, TagResponse['description']>;

const DescriptionCell = ({ getValue }: DescriptionCellProps) => (
  <p
    dangerouslySetInnerHTML={{
      __html: getValue() ?? '',
    }}
  ></p>
);

export default DescriptionCell;
