'use client';

import { createColumnHelper, type ColumnDef, Link } from '@sisa/components';

import { type CommentResponse } from '@sisa/grpc-api';

import RowActions from './row-actions';

const columnHelper = createColumnHelper<CommentResponse>();

const columnDefs: Array<ColumnDef<CommentResponse>> = [
  columnHelper.selection('id'),

  columnHelper.accessor('content', {
    id: 'Content',
    header: () => 'Content',
    enableSorting: true,
  }),

  columnHelper.flex(),
  columnHelper.actions('id', {
    cell: RowActions,
  }),
];

export default columnDefs;
