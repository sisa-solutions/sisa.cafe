import {
  createColumnHelper as createColumnHelperBase,
  type RowData,
  type ColumnDef,
  type AccessorColumnDef,
} from '@tanstack/react-table';

import { Checkbox } from '../inputs';

import { ACTIONS_COLUMN_ID, FLEX_COLUMN_ID, SELECTION_COLUMN_ID } from './constants';

export const createColumnHelper = <TData extends RowData, TValue = unknown>() => {
  const baseHelperFuncs = createColumnHelperBase<TData>();

  type accessorArgs = Parameters<typeof baseHelperFuncs.accessor>;

  const selection = (accessor: accessorArgs[0], column?: accessorArgs[1]) =>
    baseHelperFuncs.accessor(accessor, {
      id: SELECTION_COLUMN_ID,
      header: ({ table }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
          sx={{
            verticalAlign: 'text-bottom',
            justifyContent: 'center',
            width: '100%',
          }}
        />
      ),
      cell: ({ row, getValue }) => (
        <Checkbox
          value={getValue() as any}
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
            disabled: !row.getCanSelect(),
          }}
          sx={{
            verticalAlign: 'text-bottom',
          }}
        />
      ),
      enableColumnFilter: false,
      enableResizing: false,
      enableGlobalFilter: false,
      enableSorting: false,
      enableMultiSort: false,
      enableGrouping: false,
      enableHiding: false,
      enablePinning: false,
      size: 48,
      minSize: 48,
      maxSize: 48,
      ...column,
    });

  const actions = (accessor: accessorArgs[0], column?: accessorArgs[1]) =>
    baseHelperFuncs.accessor(accessor, {
      id: ACTIONS_COLUMN_ID,
      enableColumnFilter: false,
      enableResizing: false,
      enableGlobalFilter: false,
      enableSorting: false,
      enableMultiSort: false,
      enableGrouping: false,
      enableHiding: false,
      enablePinning: false,
      ...column,
    });

  const flex = () => createFlexColumn<TData, TValue>();

  return {
    ...baseHelperFuncs,
    selection,
    actions,
    flex,
  };
};

export const createActionsColumn = <TData extends RowData, TValue = unknown>(
  props?: AccessorColumnDef<TData, TValue>
): ColumnDef<TData, TValue> => ({
  id: ACTIONS_COLUMN_ID,
  enableColumnFilter: false,
  enableResizing: false,
  enableGlobalFilter: false,
  enableSorting: false,
  enableMultiSort: false,
  enableGrouping: false,
  enableHiding: false,
  enablePinning: false,
  ...props,
});

export const createFlexColumn = <TData extends RowData, TValue = unknown>(): ColumnDef<
  TData,
  TValue
> => ({
  id: FLEX_COLUMN_ID,
  enableColumnFilter: false,
  enableResizing: false,
  enableGlobalFilter: false,
  enableSorting: false,
  enableMultiSort: false,
  enableGrouping: false,
  enableHiding: false,
  enablePinning: false,
  size: 0,
  minSize: 0,
  maxSize: 0,
});
