'use client';

import { useEffect, useState } from 'react';

import {
  DataTable,
  createColumnHelper,
  type ColumnDef,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type ColumnPinningState,
} from '@sisa/components';

import { type PostResponse } from '@sisa/api';
import { sortParamsToString, useQueryString } from '@sisa/utils';

import DetailsLink from './details-link';
import RowActions from './row-actions';
import FilterToolbar from './filter-toolbar';

const columnHelper = createColumnHelper<PostResponse>();

type Props = {
  data: Array<PostResponse>;
  filter: {
    name: string;
  };
  paging: {
    itemCount: number;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
  };
};

const DataGrid = ({
  data,
  filter: { name },
  paging: { itemCount, pageIndex, pageSize, pageCount },
}: Props) => {
  const [columns] = useState<Array<ColumnDef<PostResponse>>>(() => [
    columnHelper.selection('id'),

    columnHelper.accessor('title', {
      id: 'Title',
      header: () => 'Title',
      cell: DetailsLink,
      enableMultiSort: true,
    }),
    columnHelper.accessor('category.id', {
      id: 'Category',
      header: () => 'Category',
      cell: ({ row }) => row.original.category?.name ?? '',
      enableSorting: false,
    }),
    columnHelper.accessor('slug', {
      id: 'Slug',
      header: () => 'Slug',
    }),
    columnHelper.accessor('excerpt', {
      id: 'Excerpt',
      header: () => 'Excerpt',
    }),
    columnHelper.accessor('creator.displayName', {
      id: 'CreatedBy',
      header: () => 'Created by',
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
  ]);

  const setQueryString = useQueryString();

  const [pagination, setPagination] = useState<PaginationState>(() => ({
    pageIndex: pageIndex,
    pageSize: pageSize,
  }));

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ['__SELECTION__'],
    right: ['__ACTIONS__'],
  });

  useEffect(() => {
    setQueryString({
      pageNumber: pagination.pageIndex === 0 ? undefined : pagination.pageIndex + 1,
      pageSize: pagination.pageSize === 10 ? undefined : pagination.pageSize,
    });
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    setQueryString({
      sortBy: sortParamsToString(sorting),
    });
  }, [sorting]);

  return (
    <DataTable
      columns={columns}
      data={data}
      itemCount={itemCount}
      pageCount={pageCount}
      enableRowSelection
      enableMultiSort
      state={{
        pagination,
        rowSelection,
        sorting,
        columnPinning,
      }}
      onPaginationChange={setPagination}
      onRowSelectionChange={setRowSelection}
      onSortingChange={setSorting}
      onColumnPinningChange={setColumnPinning}
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

export default DataGrid;
