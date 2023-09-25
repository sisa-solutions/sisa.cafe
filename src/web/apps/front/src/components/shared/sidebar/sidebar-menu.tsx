'use client';

import { observer } from 'mobx-react-lite';

import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';

import { SearchIcon } from 'lucide-react';

import { LinkListItemButton } from '@sisa/components';

import useStore from 'stores/use-store';

const SidebarMenu = () => {
  const sidebarStore = useStore('sidebarStore');

  return (
    <Sheet
      sx={{
        position: 'fixed',
        transform: {
          xs: 'translateX(calc(100% * (var(--sisa-sidebar-open, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.25s',
        zIndex: 'var(--sisa-sidebar-content-zIndex)',
        top: 0,
        display: 'flex',
        flexShrink: 0,
        flexDirection: 'column',
        gap: 2,
        p: 2,
        width: 'var(--sisa-sidebar-content-width)',
        height: '100dvh',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <List
        sx={{
          gap: 1,
          '--ListItem-minHeight': '36px',
          '--ListItem-radius': '8px',
        }}
      >
        <ListItem>
          <ListItemContent>
            <Input
              sx={{
                flexGrow: 1,
              }}
              placeholder="Search..."
              endDecorator={
                <IconButton>
                  <SearchIcon />
                </IconButton>
              }
            />
          </ListItemContent>
        </ListItem>
        {/* <ListItem>
          <LinkListItemButton href="/about" onClick={sidebarStore.closeSidebar}>
            About
          </LinkListItemButton>
        </ListItem> */}
        <ListItem>
          <LinkListItemButton href="/blog/posts" onClick={sidebarStore.closeSidebar}>
            Blog
          </LinkListItemButton>
        </ListItem>
        {/* <ListItem>
          <LinkListItemButton href="/tools" onClick={sidebarStore.closeSidebar}>
            Tools
          </LinkListItemButton>
        </ListItem> */}
        <ListItem>
          <LinkListItemButton href="/contact" onClick={sidebarStore.closeSidebar}>
            Contact
          </LinkListItemButton>
        </ListItem>
      </List>
    </Sheet>
  );
};

export default observer(SidebarMenu);
