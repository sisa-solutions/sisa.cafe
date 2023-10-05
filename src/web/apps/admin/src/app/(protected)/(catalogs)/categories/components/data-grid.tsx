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

import { type CategoryResponse } from '@sisa/api';
import { useQueryString } from '@sisa/utils';

import DetailsLink from './details-link';
import RowActions from './row-actions';
import FilterToolbar from './filter-toolbar';

const columnHelper = createColumnHelper<CategoryResponse>();

type Props = {
  data: Array<CategoryResponse>;
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
  const [columns] = useState<Array<ColumnDef<CategoryResponse>>>(() => [
    columnHelper.selection('id'),

    columnHelper.accessor('name', {
      id: 'name',
      header: () => 'Name',
      cell: DetailsLink,
    }),
    columnHelper.accessor('parent.name', {
      id: 'parent.name',
      header: () => 'Parent',
      cell: ({ row }) => row.original.parent?.name ?? '',
    }),
    columnHelper.accessor('slug', {
      id: 'slug',
      header: () => 'Slug',
    }),
    columnHelper.accessor('description', {
      id: 'description',
      header: () => 'Description',
      enableSorting: true,
    }),
    // columnHelper.accessor('creator', {
    //   id: 'creator.id',
    //   header: () => 'Creator',
    //   cell: ({ getValue }) => getValue<User>()?.fullName,
    // }),
    columnHelper.accessor('creator.displayName', {
      id: 'creator.displayName',
      header: () => 'Created by',
      // cell: ({ getValue }) => getValue()?.toLocaleDateString(),
      enableSorting: true,
    }),
    // columnHelper.accessor('creator.timestamp', {
    //   id: 'creator.timestamp',
    //   header: () => 'Created At',
    //   cell: ({ getValue }) => getValue()?.toLocaleDateString(),
    //   enableSorting: true,
    // }),
    // columnHelper.accessor('updater', {
    //   id: 'updater.id',
    //   header: () => 'updater',
    //   cell: ({ getValue }) => getValue<User>()?.fullName,
    // }),
    // columnHelper.accessor('updatedAt', {
    //   id: 'updatedAt',
    //   header: () => 'Updated At',
    //   cell: ({ getValue }) => getValue()?.toLocaleDateString(),
    //   enableSorting: true,
    // }),
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

  return (
    <DataTable
      columns={columns}
      data={data}
      itemCount={itemCount}
      pageCount={pageCount}
      enableRowSelection
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
