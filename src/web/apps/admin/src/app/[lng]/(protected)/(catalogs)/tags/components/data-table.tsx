'use client';

import { createColumnHelper, DataGrid } from '@sisa/components';
import { Link } from '@sisa/next';
import { type TagResponse } from '@sisa/grpc-api';

import useClientI18n from 'i18n/use-client-i18n';

import FilterToolbar from './filter-toolbar';
import RowActions from './row-actions';

interface Props {
  pageIndex: number;
  pageSize: number;
  itemCount: number;
  pageCount: number;
  name?: string;
  data: Array<TagResponse>;
}

const DataTable = ({ data, pageIndex, pageSize, itemCount, pageCount, name }: Props) => {
  const [t] = useClientI18n();

  const columnHelper = createColumnHelper<TagResponse>();

  const columnDefs = [
    columnHelper.selection('id'),

    columnHelper.accessor('name', {
      id: 'Name',
      header: () => t('label.name'),
      cell: ({ row, getValue }) => (
        <Link underline="always" disableCache={true} href={`/tags/${row.original.id}/details`}>
          {getValue()}
        </Link>
      ),
      enableSorting: true,
    }),
    columnHelper.accessor('slug', {
      id: 'Slug',
      header: () => t('label.slug'),
      enableSorting: true,
    }),
    columnHelper.dangerouslyHtml('description', {
      id: 'Description',
      header: t('label.description'),
      enableSorting: true,
    }),
    columnHelper.accessor('postCount', {
      id: 'PostCount',
      header: () => t('label.postCount'),
      enableSorting: true,
    }),
    columnHelper.accessor('creator.id', {
      id: 'CreatedBy',
      header: () => t('label.createdBy'),
      cell: ({ row }) => row.original.creator?.displayName ?? '',
      enableSorting: false,
    }),
    columnHelper.accessor('creator.timestamp', {
      id: 'CreatedAt',
      header: () => t('label.createdAt'),
      cell: ({ getValue }) => getValue()?.toLocaleString(),
      enableSorting: true,
    }),
    columnHelper.accessor('updater.id', {
      id: 'UpdatedBy',
      header: () => t('label.updatedBy'),
      cell: ({ row }) => row.original.updater?.displayName ?? '',
      enableSorting: false,
    }),
    columnHelper.accessor('updater.timestamp', {
      id: 'UpdatedAt',
      header: () => t('label.updatedAt'),
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
