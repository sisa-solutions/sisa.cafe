import { createColumnHelper as createColumnHelperBase, type RowData } from '@tanstack/react-table';

import Checkbox from '@mui/joy/Checkbox';

import { CheckIcon, MinusIcon } from 'lucide-react';

import { ACTIONS_COLUMN_ID, FLEX_COLUMN_ID, SELECTION_COLUMN_ID } from '../data-table/constants';
import SettingsAction from '../data-table/settings-action';

const createColumnHelper = <TData extends RowData, TValue = unknown>() => {
  const baseHelperFuncs = createColumnHelperBase<TData>();

  type accessorArgs = Parameters<typeof baseHelperFuncs.accessor>;

  const selection = (accessor: accessorArgs[0], column?: accessorArgs[1]) =>
    baseHelperFuncs.accessor(accessor, {
      id: SELECTION_COLUMN_ID,
      header: ({ table }) => (
        <Checkbox
          checkedIcon={<CheckIcon />}
          indeterminateIcon={<MinusIcon />}
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
          checkedIcon={<CheckIcon />}
          indeterminateIcon={<MinusIcon />}
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
      size: 52,
      minSize: 52,
      maxSize: 52,
      ...column,
    });

  const dangerouslyHtml = (accessor: accessorArgs[0], column?: accessorArgs[1]) =>
    baseHelperFuncs.accessor(accessor, {
      // @ts-ignore
      id: column?.id,
      cell: ({ getValue }) => (
        <div dangerouslySetInnerHTML={{ __html: getValue<string>() ?? '' }} />
      ),
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
      size: 52,
      minSize: 52,
      maxSize: 52,
      header: ({ table }) => <SettingsAction table={table} />,
      ...column,
    });

  const flex = () => ({
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

  return {
    ...baseHelperFuncs,
    selection,
    actions,
    flex,
    dangerouslyHtml,
  };
};

export default createColumnHelper;
