'use client';

import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';

import { dayUtils } from '@sisa/i18n';

import { type ColumnDef, createColumnHelper, Link, DataGrid } from '@sisa/components';
import { type CategoryResponse } from '@sisa/grpc-api';

import FilterToolbar from './filter-toolbar';
import RowActions from './row-actions';

import useClientI18n from 'i18n/use-client-i18n';

interface Props {
  pageIndex: number;
  pageSize: number;
  itemCount: number;
  pageCount: number;
  name?: string;
  data: Array<CategoryResponse>;
}

const DataTable = ({ data, pageIndex, pageSize, itemCount, pageCount, name }: Props) => {
  const [t] = useClientI18n();

  const columnHelper = createColumnHelper<CategoryResponse>();

  const columnDefs: Array<ColumnDef<CategoryResponse>> = [
    columnHelper.selection('id'),

    columnHelper.accessor('name', {
      id: 'Name',
      header: t('label.name'),
      cell: ({ row, getValue }) => (
        <Link
          underline="always"
          disableCache={true}
          href={`/categories/${row.original.id}/details`}
        >
          {getValue()}
        </Link>
      ),
      enableMultiSort: true,
    }),
    columnHelper.accessor('parent.name', {
      id: 'Parent.Name',
      header: t('label.parentCategory'),
      cell: ({ row }) => row.original.parent?.name ?? '',
      enableSorting: true,
    }),
    columnHelper.accessor('postCount', {
      id: 'PostCount',
      header: t('label.postCount'),
      cell: ({ getValue }) => (
        <Box display="flex" alignItems="center">
          <Chip color="success">{getValue()}</Chip>
        </Box>
      ),
    }),
    columnHelper.accessor('creator.displayName', {
      id: 'CreatedBy',
      header: t('label.createdBy'),
      enableSorting: false,
    }),
    columnHelper.accessor('creator.timestamp', {
      id: 'CreatedAt',
      header: t('label.createdAt'),
      cell: ({ getValue }) => dayUtils(getValue()).fromNow(),
      enableSorting: true,
    }),
    columnHelper.accessor('updater.displayName', {
      id: 'UpdatedBy',
      header: t('label.updatedBy'),
      cell: ({ row }) => row.original.updater?.displayName ?? '',
      enableSorting: false,
    }),
    columnHelper.accessor('updater.timestamp', {
      id: 'UpdatedAt',
      header: t('label.updatedAt'),
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
