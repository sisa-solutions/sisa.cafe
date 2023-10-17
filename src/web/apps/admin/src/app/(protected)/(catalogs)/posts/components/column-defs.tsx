'use client';

import { createColumnHelper, type ColumnDef, Link } from '@sisa/components';

import { PostStatus, type PostResponse } from '@sisa/grpc-api';

import RowActions from './row-actions';

const columnHelper = createColumnHelper<PostResponse>();
const columnDefs: Array<ColumnDef<PostResponse>> = [
  columnHelper.selection('id'),

  columnHelper.accessor('title', {
    id: 'Title',
    header: () => 'Title',
    cell: ({ row, getValue }) => (
      <Link underline="always" disableCache={true} href={`/posts/${row.original.id}/details`}>
        {getValue()}
      </Link>
    ),
    enableMultiSort: true,
  }),
  columnHelper.accessor('category.id', {
    id: 'Category',
    header: () => 'Category',
    cell: ({ row }) => row.original.category?.name ?? '',
    enableSorting: false,
  }),
  columnHelper.accessor('status', {
    id: 'Status',
    header: () => 'Status',
    enableSorting: true,
    cell: ({ getValue }) => PostStatus[getValue()],
  }),
  columnHelper.accessor('creator.displayName', {
    id: 'CreatedBy',
    header: () => 'Created by',
    enableSorting: false,
  }),
  columnHelper.accessor('commentCount', {
    id: 'CommentCount',
    header: () => 'Comment Count',
    enableSorting: false,
  }),
  columnHelper.accessor('creator.timestamp', {
    id: 'CreatedAt',
    header: () => 'Created At',
    cell: ({ getValue }) => getValue()?.toLocaleString(),
    enableSorting: true,
  }),
  columnHelper.accessor('updater.displayName', {
    id: 'UpdatedBy',
    header: () => 'Updated by',
    cell: ({ row }) => row.original.updater?.displayName ?? '',
    enableSorting: false,
  }),
  columnHelper.accessor('updater.timestamp', {
    id: 'UpdatedAt',
    header: () => 'Updated At',
    cell: ({ row }) => row.original.updater?.timestamp?.toLocaleString() ?? '',
    enableSorting: true,
  }),
  columnHelper.flex(),
  columnHelper.actions('id', {
    header: () => 'Actions',
    cell: RowActions,
  }),
];

export default columnDefs;
