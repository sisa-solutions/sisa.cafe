'use client';

import type { CellContext } from '@tanstack/react-table';

import type { PostResponse } from '@sisa/api';

type DescriptionCellProps = CellContext<PostResponse, PostResponse['excerpt']>;

const DescriptionCell = ({ getValue }: DescriptionCellProps) => (
  <p
    dangerouslySetInnerHTML={{
      __html: getValue() ?? '',
    }}
  ></p>
);

export default DescriptionCell;
