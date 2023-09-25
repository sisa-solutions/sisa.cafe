'use client';

import { useState } from 'react';

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

import DetailsLink from './details-link';
import ItemActions from './item-actions';
import FilterToolbar from './filter-toolbar';

const columnHelper = createColumnHelper<CategoryResponse>();

type Props = {
  data: Array<CategoryResponse>;
};

const DataGrid = ({ data }: Props) => {
  const [columns] = useState<Array<ColumnDef<CategoryResponse>>>(() => [
    columnHelper.selection('id'),
    columnHelper.accessor('name', {
      id: 'name',
      header: () => 'Name',
      cell: DetailsLink,
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
    // columnHelper.accessor('parent', {
    //   id: 'parent.id',
    //   header: () => 'Parent',
    //   cell: ({ getValue }) => getValue<CategoryResponse>()?.name,
    // }),
    // columnHelper.accessor('creator', {
    //   id: 'creator.id',
    //   header: () => 'Creator',
    //   cell: ({ getValue }) => getValue<User>()?.fullName,
    // }),
    // columnHelper.accessor('createdAt', {
    //   id: 'createdAt',
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
      cell: ItemActions,
    }),
  ]);

  const [pagination, setPagination] = useState<PaginationState>(() => ({
    pageIndex: 0,
    pageSize: 10,
  }));

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ['__SELECTION__'],
    right: ['__ACTIONS__'],
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      itemCount={100}
      pageCount={10}
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
        toolbar: <FilterToolbar />,
      }}
    />
  );
};

export default DataGrid;
