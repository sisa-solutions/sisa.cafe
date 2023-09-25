import Box from '@mui/joy/Box';

import SidebarMenu from './sidebar-menu';
import SidebarOverlay from './sidebar-overlay';

const Sidebar = () => {
  return (
    <Box
      className="sisa-sidebar"
      sx={{
        display: {
          xs: 'flex',
          md: 'none',
        }
      }}
    >
      <SidebarOverlay />
      <SidebarMenu />
    </Box>
  );
};

export default Sidebar;
