'use client';

import { createColumnHelper, DataGrid } from '@sisa/components';
import { PostStatus, type PostResponse } from '@sisa/grpc-api';
import { Link } from '@sisa/next';

import useClientI18n from 'i18n/use-client-i18n';

import FilterToolbar from './filter-toolbar';
import RowActions from './row-actions';

interface Props {
  pageIndex: number;
  pageSize: number;
  itemCount: number;
  pageCount: number;
  name?: string;
  data: Array<PostResponse>;
}

const DataTable = ({ data, pageIndex, pageSize, itemCount, pageCount, name }: Props) => {
  const [t] = useClientI18n();

  const columnHelper = createColumnHelper<PostResponse>();
  const columnDefs = [
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
      cell: ({ getValue }) => PostStatus[getValue<number>()],
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
      cell: RowActions,
    }),
  ];

  return (
    <DataGrid
      columns={columnDefs}
      data={data}
      pageIndex={pageIndex}
      pageSize={pageSize}
      itemCount={itemCount}
      pageCount={pageCount}
      enableRowSelection
      enableMultiSort
      slots={{
        toolbar: (
          <FilterToolbar
            defaultValues={{
              name,
            }}
          />
        ),
      }}
    />
  );
};

export default DataTable;
