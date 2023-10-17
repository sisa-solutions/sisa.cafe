'use client';

import useMutation from 'swr/mutation';

import type { CellContext, ColumnDefTemplate } from '@tanstack/react-table';

import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';

import { AlertCircleIcon, XIcon } from 'lucide-react';

import { ConfirmDialog } from '@sisa/components';

import { type CommentResponse, deleteTag } from '@sisa/grpc-api';

import { useQueryString, useToggle } from '@sisa/hooks';
import { randomId } from '@sisa/utils';

const RowActions: ColumnDefTemplate<CellContext<CommentResponse, string>> = ({ row }) => {
  const setQueryString = useQueryString();

  const { trigger, isMutating } = useMutation(['/api/v1/comments/delete', row.original.id], ([_, id]) =>
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
    <>
      <ButtonGroup spacing={1} size="sm" variant="solid">
        <IconButton color="danger" onClick={onClickDelete}>
          <XIcon />
        </IconButton>
      </ButtonGroup>

      <ConfirmDialog
        open={isConfirmDialogOpen}
        color="danger"
        isLoading={isMutating}
        icon={<AlertCircleIcon />}
        title="Delete comment"
        content={`Are you sure you want to delete this comments?`}
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
