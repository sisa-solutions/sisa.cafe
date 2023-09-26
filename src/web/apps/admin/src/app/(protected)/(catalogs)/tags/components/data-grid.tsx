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

import { type TagResponse } from '@sisa/api';

import DetailsLink from './details-link';
import ItemActions from './item-actions';
import FilterToolbar from './filter-toolbar';
import { useQueryString } from '@sisa/utils';

const columnHelper = createColumnHelper<TagResponse>();

type Props = {
  data: Array<TagResponse>;
  filter: {
    name: string;
  };
  paging: {
    count: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
};

const DataGrid = ({
  data,
  filter: { name },
  paging: { count, page, pageSize, pageCount },
}: Props) => {
  const [columns] = useState<Array<ColumnDef<TagResponse>>>(() => [
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

  const [setQueryString] = useQueryString();

  const [pagination, setPagination] = useState<PaginationState>(() => ({
    pageIndex: page - 1,
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
      page: pagination.pageIndex === 0 ? undefined : pagination.pageIndex + 1,
      pageSize: pagination.pageSize === 10 ? undefined : pagination.pageSize,
    });
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <DataTable
      columns={columns}
      data={data}
      itemCount={count}
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
