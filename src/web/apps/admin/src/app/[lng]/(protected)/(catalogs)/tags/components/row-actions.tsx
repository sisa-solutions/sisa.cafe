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

import { deleteTag, type TagResponse } from '@sisa/grpc-api';

import { useQueryString, useToggle } from '@sisa/hooks';
import { randomId } from '@sisa/utils';
import { ConfirmDialog, Link } from '@sisa/components';
import useClientI18n from 'i18n/use-client-i18n';

const RowActions: ColumnDefTemplate<CellContext<TagResponse, string>> = ({ row }) => {
  const { t } = useClientI18n();
  const setQueryString = useQueryString();
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback((_: React.SyntheticEvent | null, isOpen: boolean) => {
    setOpen(isOpen);
  }, []);

  const { trigger, isMutating } = useMutation(['/api/v1/tags/delete', row.original.id], ([_, id]) =>
    deleteTag({
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
            <Link disableCache={true} href={`/tags/${row.original.id}/edit`} overlay>
              {t('label.edit')}
            </Link>
          </MenuItem>
          <MenuItem onClick={onClickDelete}>
            <ListItemDecorator>
              <XIcon />
            </ListItemDecorator>
            {t('label.delete')}
          </MenuItem>
        </Menu>
      </Dropdown>

      <ConfirmDialog
        open={isConfirmDialogOpen}
        color="danger"
        isLoading={isMutating}
        icon={<AlertCircleIcon />}
        title={t('label.deleteTag')}
        content={`Are you sure you want to delete "${row.original.name}" tag?`}
        onClose={closeConfirmDialog}
        confirmProps={{
          label: t('label.delete'),
          onClick: onConfirm,
        }}
        cancelProps={{
          label: t('label.cancel'),
          onClick: closeConfirmDialog,
        }}
      />
    </Box>
  );
};

export default RowActions;
