'use client';

import { useState } from 'react';

import {
  type TableOptions,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  ColumnOrderState,
  getPaginationRowModel,
} from '@tanstack/react-table';

import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';

import THead from './thead';
import TBody from './tbody';
import Pagination from './pagination';
import LoadingOverlay from './loading-overlay';
import Toolbar from './toolbar';

type Props<T> = Pick<
  TableOptions<T>,
  | 'data'
  | 'columns'
  | 'state'
  | 'pageCount'
  | 'manualPagination'
  | 'enableMultiSort'
  | 'enableRowSelection'
  | 'onRowSelectionChange'
  | 'onPaginationChange'
  | 'onSortingChange'
  | 'onColumnFiltersChange'
  | 'onColumnPinningChange'
> & {
  itemCount: number;
  isLoading?: boolean;
  slots?: {
    toolbar?: React.ReactNode;
  };
};

const DataGrid = <T extends {}>(props: Props<T>) => {
  const {
    isLoading,
    columns,
    data,
    state,
    itemCount,
    pageCount,
    manualPagination,
    enableMultiSort,
    onPaginationChange,
    onRowSelectionChange,
    onSortingChange,
    onColumnFiltersChange,
    onColumnPinningChange,
    slots = {},
  } = props;

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string)
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      ...state,
    },
    enableRowSelection: true, //enable row selection for all rows
    enableSorting: true,
    enablePinning: true,
    columnResizeMode: 'onChange',
    pageCount,
    manualPagination: manualPagination ?? true,
    debugTable: true,
    enableMultiSort,

    onRowSelectionChange,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onColumnPinningChange,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // const leftHeaderGroups = table.getLeftHeaderGroups();
  // const centerHeaderGroups = table.getCenterHeaderGroups();
  // const rightHeaderGroups = table.getRightHeaderGroups();

  // const leftRowsData = table.getRowModel().rows.map((row) => ({
  //   ...row,
  //   getVisibleCells: () => row.getLeftVisibleCells(),
  // }));

  // const centerRowsData = table.getRowModel().rows.map((row) => ({
  //   ...row,
  //   getVisibleCells: () => row.getCenterVisibleCells(),
  // }));

  // const rightRowsData = table.getRowModel().rows.map((row) => ({
  //   ...row,
  //   getVisibleCells: () => row.getRightVisibleCells(),
  // }));

  // const hasPinningLeft = table.getState().columnPinning?.left?.length ?? 0 > 0;
  // const hasPinningRight = table.getState().columnPinning?.right?.length ?? 0 > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflow: 'hidden',
      }}
    >
      <Toolbar>{slots.toolbar}</Toolbar>
      <Sheet
        variant="outlined"
        className="table-container"
        sx={{
          width: '100%',
          borderRadius: 'sm',
          flex: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-label="data-table"
          stickyHeader
          stickyFooter
          borderAxis="xBetween"
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '& thead > tr > th.data-table-pinned-left': {
              zIndex: 'calc(var(--joy-zIndex-table) + 2)',
            },
            '& thead > tr > th.data-table-pinned-right': {
              zIndex: 'calc(var(--joy-zIndex-table) + 2)',
            },
            '& .data-table-pinned-left': {
              position: 'sticky',
              left: 0,
              zIndex: 'calc(var(--joy-zIndex-table) + 1)',
              backgroundColor: 'var(--TableCell-headBackground)',
              borderRight: '1px solid var(--TableCell-borderColor)',
            },
            '& .data-table-pinned-right': {
              position: 'sticky',
              right: 0,
              zIndex: 'calc(var(--joy-zIndex-table) + 1)',
              backgroundColor: 'var(--TableCell-headBackground)',
              borderLeft: '1px solid var(--TableCell-borderColor)',
            },
          }}
        >
          <THead headerGroups={table.getHeaderGroups()} />
          {isLoading && <LoadingOverlay table={table} />}
          {!isLoading && <TBody rows={table.getRowModel().rows} />}
        </Table>
      </Sheet>
      <Pagination table={table} itemCount={itemCount} />
    </Box>
  );
};

export default DataGrid;
