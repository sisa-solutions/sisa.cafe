'use client';

import { createColumnHelper, type ColumnDef, Link } from '@sisa/components';

import { type TagResponse } from '@sisa/grpc-api';

import RowActions from './row-actions';

const columnHelper = createColumnHelper<TagResponse>();

const columnDefs: Array<ColumnDef<TagResponse>> = [
  columnHelper.selection('id'),

  columnHelper.accessor('name', {
    id: 'Name',
    header: () => 'Name',
    cell: ({ row, getValue }) => (
      <Link underline="always" disableCache={true} href={`/tags/${row.original.id}/details`}>
        {getValue()}
      </Link>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('slug', {
    id: 'Slug',
    header: () => 'Slug',
    enableSorting: true,
  }),
  columnHelper.dangerouslyHtml('description', {
    id: 'Description',
    header: () => 'Description',
    enableSorting: true,
  }),
  columnHelper.accessor('postCount', {
    id: 'PostCount',
    header: () => 'Post Count',
    enableSorting: true,
  }),
  columnHelper.accessor('creator.id', {
    id: 'CreatedBy',
    header: () => 'Created By',
    cell: ({ row }) => row.original.creator?.displayName ?? '',
    enableSorting: false,
  }),
  columnHelper.accessor('creator.timestamp', {
    id: 'CreatedAt',
    header: () => 'Created At',
    cell: ({ getValue }) => getValue()?.toLocaleString(),
    enableSorting: true,
  }),
  columnHelper.accessor('updater.id', {
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
    cell: RowActions,
  }),
];

export default columnDefs;
