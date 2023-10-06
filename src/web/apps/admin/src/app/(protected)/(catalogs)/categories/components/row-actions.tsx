'use client';

import useMutation from 'swr/mutation';

import type { CellContext, ColumnDefTemplate } from '@tanstack/react-table';

import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';

import { AlertCircleIcon, PencilLineIcon, XIcon } from 'lucide-react';

import { ConfirmDialog, LinkIconButton } from '@sisa/components';

import { type CategoryResponse, deleteCategory } from '@sisa/api';
import { randomId, useToggle, useQueryString } from '@sisa/utils';

const RowActions: ColumnDefTemplate<CellContext<CategoryResponse, string>> = ({ row }) => {
  const setQueryString = useQueryString();

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
    <>
      <ButtonGroup spacing={1} size="sm" variant="solid">
        <LinkIconButton href={`/categories/${row.original.id}/edit`} color="primary">
          <PencilLineIcon />
        </LinkIconButton>
        <IconButton color="danger" onClick={onClickDelete}>
          <XIcon />
        </IconButton>
      </ButtonGroup>

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
    </>
  );
};

export default RowActions;
