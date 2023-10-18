'use client';

import { createColumnHelper, type ColumnDef, Link } from '@sisa/components';

import { dayUtils } from '@sisa/i18n';
import { type CategoryResponse } from '@sisa/grpc-api';

import RowActions from './row-actions';

const columnHelper = createColumnHelper<CategoryResponse>();

const columnDefs: Array<ColumnDef<CategoryResponse>> = [
  columnHelper.selection('id'),

  columnHelper.accessor('name', {
    id: 'Name',
    header: () => 'Name',
    cell: ({ row, getValue }) => (
      <Link underline="always" disableCache={true} href={`/categories/${row.original.id}/details`}>
        {getValue()}
      </Link>
    ),
    enableMultiSort: true,
  }),
  columnHelper.accessor('parent.name', {
    id: 'Parent.Name',
    header: () => 'Parent',
    cell: ({ row }) => row.original.parent?.name ?? '',
    enableSorting: true,
  }),
  columnHelper.accessor('postCount', {
    id: 'PostCount',
    header: () => 'Post Count',
  }),
  columnHelper.accessor('creator.displayName', {
    id: 'CreatedBy',
    header: () => 'Created by',
    enableSorting: false,
  }),
  columnHelper.accessor('creator.timestamp', {
    id: 'CreatedAt',
    header: () => 'Created At',
    cell: ({ getValue }) => dayUtils(getValue()).fromNow(),
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
    cell: ({ getValue }) => {
      const value = getValue();

      return value && dayUtils(value).fromNow();
    },
    enableSorting: true,
  }),
  columnHelper.flex(),
  columnHelper.actions('id', {
    cell: RowActions,
  }),
];

export default columnDefs;
