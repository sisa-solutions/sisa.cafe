import Container from '@mui/joy/Container';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
import ListItemContent from '@mui/joy/ListItemContent';
import IconButton from '@mui/joy/IconButton';
import Avatar from '@mui/joy/Avatar';

import { HomeIcon, SearchIcon } from 'lucide-react';

import { LinkListItemButton } from '@sisa/components';

import ToggleColorSchemeListItemIcon from './toggle-color-scheme-icon';
import { ToggleSidebarIcon } from './sidebar';

const Header = () => {
  return (
    <Sheet
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        position: 'fixed',
        zIndex: 'var(--sisa-header-zIndex)',
        top: 0,
        px: 2,
        width: '100vw',
        height: 'var(--sisa-header-height)',
        boxShadow: 'sm',
      }}
    >
      <Container component="nav" maxWidth="lg" disableGutters>
        <List
          orientation="horizontal"
          sx={{
            '& li > div': {
              borderRadius: 'md',
            },
            '--List-gap': {
              xs: '8px',
              md: '16px',
            },
            '--List-padding': '0px',
            alignItems: 'center',
          }}
        >
          <ListItem
            sx={{
              display: {
                md: 'none',
              },
            }}
          >
            <ToggleSidebarIcon />
          </ListItem>
          <ListItem>
            <LinkListItemButton href="/">
              <HomeIcon />
            </LinkListItemButton>
          </ListItem>
          {/* <ListItem
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <LinkListItemButton href="/about">About</LinkListItemButton>
          </ListItem> */}
          <ListItem
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <LinkListItemButton href="/blog/posts">Blog</LinkListItemButton>
          </ListItem>
          {/* <ListItem
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <LinkListItemButton href="/tools">Tools</LinkListItemButton>
          </ListItem> */}
          <ListItem
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <LinkListItemButton href="/contact">Contact</LinkListItemButton>
          </ListItem>
          <ListItem
            sx={{
              flex: 1,
            }}
          >
            <ListItemContent
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
              }}
            >
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
          <ListItem>
            <ToggleColorSchemeListItemIcon />
          </ListItem>
          <ListItem>
            <Avatar>S</Avatar>
          </ListItem>
        </List>
      </Container>
    </Sheet>
  );
};

export default Header;
