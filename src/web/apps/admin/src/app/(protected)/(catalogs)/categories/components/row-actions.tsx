'use client';

import { useCallback, useState } from 'react';

import useMutation from 'swr/mutation';

import type { CellContext, ColumnDefTemplate } from '@tanstack/react-table';

import Box from '@mui/joy/Box';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import IconButton from '@mui/joy/IconButton';

import { AlertCircleIcon, MoreHorizontalIcon, PencilLineIcon, XIcon } from 'lucide-react';

import { ConfirmDialog, Link } from '@sisa/components';
import { randomId } from '@sisa/utils';
import { useQueryString, useToggle } from '@sisa/hooks';

import { type CategoryResponse, deleteCategory } from '@sisa/grpc-api';

const RowActions: ColumnDefTemplate<CellContext<CategoryResponse, string>> = ({ row }) => {
  const setQueryString = useQueryString();

  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback((_: React.SyntheticEvent | null, isOpen: boolean) => {
    setOpen(isOpen);
  }, []);

  const { trigger, isMutating } = useMutation(
    ['/api/v1/categories/delete', row.original.id],
    ([_, id]) =>
      deleteCategory({
        id,
      })
  );

  const {
    value: isConfirmDialogOpen,
    on: openConfirmDialog,
    off: closeConfirmDialog,
  } = useToggle();

  const onClickDelete = () => {
    openConfirmDialog();
  };

  const onConfirm = async () => {
    await trigger();

    closeConfirmDialog();

    setQueryString({
      _s: randomId(),
    });
  };

  return (
    <Box>
      <Dropdown open={open} onOpenChange={handleOpenChange}>
        <MenuButton
          size="sm"
          variant="solid"
          slots={{
            root: IconButton,
          }}
        >
          <MoreHorizontalIcon />
        </MenuButton>
        <Menu
          keepMounted
          size="sm"
          sx={{
            minWidth: '180px',
          }}
        >
          <MenuItem>
            <ListItemDecorator>
              <PencilLineIcon />
            </ListItemDecorator>
            <Link disableCache={true} href={`/categories/${row.original.id}/edit`} overlay>
              Edit
            </Link>
          </MenuItem>
          {row.original.postCount === 0 && (
            <MenuItem onClick={onClickDelete}>
              <ListItemDecorator>
                <XIcon />
              </ListItemDecorator>
              Delete
            </MenuItem>
          )}
        </Menu>
      </Dropdown>

      <ConfirmDialog
        open={isConfirmDialogOpen}
        color="danger"
        isLoading={isMutating}
        icon={<AlertCircleIcon />}
        title="Delete Category"
        content={`Are you sure you want to delete "${row.original.name}" category?`}
        onClose={closeConfirmDialog}
        confirmProps={{
          label: 'Delete',
          onClick: onConfirm,
        }}
        cancelProps={{
          label: 'Cancel',
          onClick: closeConfirmDialog,
        }}
      />
    </Box>
  );
};

export default RowActions;
