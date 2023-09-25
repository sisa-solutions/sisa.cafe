import { useState, type MouseEvent, useMemo } from 'react';

import { Table, flexRender } from '@tanstack/react-table';

import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';

import Menu from '@mui/joy/Menu';

import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, SettingsIcon } from 'lucide-react';

import { PREDEFINED_COLUMN_IDS } from './constants';
import { Checkbox } from '../inputs';

type Props<TData> = {
  table: Table<TData>;
};

const SettingsAction = <TData extends {}>(props: Props<TData>) => {
  const { table } = props;

  const headers = useMemo(() => table.getLeafHeaders(), [table]);

  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isSettingsMenuOpen = Boolean(settingsMenuAnchorEl);

  const handleOpenSettingsMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setSettingsMenuAnchorEl(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setSettingsMenuAnchorEl(null);
  };

  return (
    <Box sx={{ alignItems: 'flex-end' }}>
      <IconButton variant="outlined" color="neutral" onClick={handleOpenSettingsMenu}>
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={settingsMenuAnchorEl}
        open={isSettingsMenuOpen}
        onClose={handleCloseSettingsMenu}
        placement="bottom-end"
      >
        {table
          .getState()
          .columnOrder.filter((columnId) => PREDEFINED_COLUMN_IDS.indexOf(columnId) === -1)
          .map((columnId) => {
            const column = table.getColumn(columnId);
            const header = headers.find((header) => header.column.id === columnId);

            if (!column || !header) {
              return null;
            }

            return (
              <ListItem
                key={columnId}
                sx={{
                  gap: 1,
                }}
              >
                <ListItemDecorator
                  sx={{
                    gap: 1,
                  }}
                >
                  {column.getCanHide() && (
                    <Checkbox
                      checked={column.getIsVisible()}
                      onClick={column.getToggleVisibilityHandler()}
                    />
                  )}
                  {column.getCanSort() && (
                    <IconButton
                      onClick={column.getToggleSortingHandler()}
                      size="sm"
                      variant="solid"
                      disabled={!column.getIsVisible()}
                      sx={{
                        ...(column.getIsSorted() === false && {
                          '&': {
                            opacity: 0.5,
                          },
                        }),
                      }}
                    >
                      {{
                        asc: <ArrowUpIcon />,
                        desc: <ArrowDownIcon />,
                      }[column.getIsSorted() as string] ?? <ArrowUpDownIcon />}
                    </IconButton>
                  )}
                </ListItemDecorator>
                <ListItemContent>
                  {flexRender(column.columnDef.header, header.getContext())}
                </ListItemContent>
              </ListItem>
            );
          })}
      </Menu>
    </Box>
  );
};

export default SettingsAction;
