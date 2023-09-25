'use client';

import { observer } from 'mobx-react-lite';

import ListItemButton, { type ListItemButtonProps } from '@mui/joy/ListItemButton';

import { MenuIcon } from 'lucide-react';

import useStore from 'stores/use-store';

type Props = Omit<ListItemButtonProps, 'children'>;

const ToggleSidebarIcon = (props: Props) => {
  const sidebarStore = useStore('sidebarStore');

  return (
    <ListItemButton onClick={sidebarStore.toggleSidebar} {...props}>
      <MenuIcon />
    </ListItemButton>
  );
};

export default observer(ToggleSidebarIcon);
