import type { CellContext, ColumnDefTemplate } from '@tanstack/react-table';

import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';

import { PencilLineIcon, XIcon } from 'lucide-react';

import { LinkIconButton } from '@sisa/components';
import { type CategoryResponse } from '@sisa/api';

const ItemActions: ColumnDefTemplate<CellContext<CategoryResponse, string>> = ({ row }) => {
  return (
    <ButtonGroup spacing={1} size="sm" variant="solid">
      <LinkIconButton href={`/categories/${row.original.id}/edit`} color="primary">
        <PencilLineIcon />
      </LinkIconButton>
      <IconButton color="danger">
        <XIcon />
      </IconButton>
    </ButtonGroup>
  );
};

export default ItemActions;
