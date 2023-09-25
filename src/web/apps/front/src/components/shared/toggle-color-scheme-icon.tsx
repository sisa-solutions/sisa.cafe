'use client';

import { useEffect, useState } from 'react';

import ListItemButton, { type ListItemButtonProps } from '@mui/joy/ListItemButton';

import { useColorScheme } from '@mui/joy/styles';

import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';

const ToggleColorSchemeListItemIcon = (props: ListItemButtonProps) => {
  const [mounted, setMounted] = useState(false);
  const { mode, setMode } = useColorScheme();

  // necessary for server-side rendering
  // because mode is undefined on the server
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ListItemButton {...props} onClick={(evt) => evt.preventDefault()}>
        <SunMoonIcon />
      </ListItemButton>
    );
  }

  const toggleModeHandler = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <ListItemButton onClick={toggleModeHandler} {...props}>
      <SunIcon display={mode === 'light' ? 'none' : 'block'} />
      <MoonIcon display={mode === 'dark' ? 'none' : 'block'} />
    </ListItemButton>
  );
};

export default ToggleColorSchemeListItemIcon;
