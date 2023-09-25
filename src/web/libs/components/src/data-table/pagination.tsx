import { Table } from '@tanstack/react-table';

import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
} from 'lucide-react';

type Props<T> = {
  table: Table<T>;
  itemCount: number;
};

const Pagination = <T extends {}>(props: Props<T>) => {
  const { table, itemCount } = props;

  const page = table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;
  const pageSizeOptions = [5, 10, 25, 50, 100];

  const fromRow = (page - 1) * pageSize + 1;
  const toRow = Math.min(page * pageSize, itemCount);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          minWidth: 80,
        }}
      >
        {fromRow} - {toRow} of {itemCount}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
        }}
      />
      <FormControl
        orientation="horizontal"
        size="sm"
        sx={{
          display: {
            xs: 'none',
            md: 'inherit',
          },
        }}
      >
        <FormLabel
          sx={{
            fontSize: 'md',
          }}
        >
          Rows per page:
        </FormLabel>
        <Select
          indicator={<ChevronsUpDownIcon />}
          sx={{
            width: 80,
            fontSize: 'md',
          }}
          slotProps={{
            button: {
              sx: {
                textAlign: 'center',
              },
            },
          }}
          value={table.getState().pagination.pageSize}
          onChange={(_, value) => {
            table.setPageSize(Number(value));
          }}
        >
          {pageSizeOptions.map((value) => (
            <Option key={value} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          <ChevronsLeftIcon />
        </IconButton>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Input
          size="sm"
          type="number"
          sx={{
            width: 40,
            display: {
              xs: 'none',
              md: 'inherit',
            },
          }}
          value={page}
          slotProps={{
            input: {
              sx: {
                textAlign: 'center',
                '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                  appearance: 'none',
                },
                MozAppearance: 'textfield',
              },
            },
          }}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <ChevronsRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Pagination;
