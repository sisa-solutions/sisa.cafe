'use client';

import { type ColumnDef, createColumnHelper, DataGrid } from '@sisa/components';
import { type CommentResponse } from '@sisa/grpc-api';

import FilterToolbar from './filter-toolbar';
import RowActions from './row-actions';

import useClientI18n from 'i18n/use-client-i18n';

interface Props {
  pageIndex: number;
  pageSize: number;
  itemCount: number;
  pageCount: number;
  keyword?: string;
  data: Array<CommentResponse>;
}

const DataTable = ({ data, pageIndex, pageSize, itemCount, pageCount, keyword }: Props) => {
  const [t] = useClientI18n();

  const columnHelper = createColumnHelper<CommentResponse>();

  const columnDefs: Array<ColumnDef<CommentResponse>> = [
    columnHelper.selection('id'),

    columnHelper.accessor('content', {
      id: 'Content',
      header: () => 'Content',
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
              keyword,
            }}
          />
        ),
      }}
    />
  );
};

export default DataTable;
