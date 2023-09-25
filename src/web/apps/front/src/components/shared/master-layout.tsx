import { type ReactNode } from 'react';

import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Sheet from '@mui/joy/Sheet';

import App from './app';
import Header from './header';
import { Sidebar } from './sidebar';

type Props = {
  children: ReactNode;
};

const MasterLayout = ({ children }: Props) => {
  return (
    <App>
      <Header />
      <Sidebar />
      <Box
        sx={{
          display: 'flex',
          height: '100dvh',
          width: '100dvw',
          pt: 'var(--sisa-header-height)',
        }}
      >
        <Sheet
          variant="plain"
          color="neutral"
          sx={{
            display: 'flex',
            flex: 1,
            overflowY: 'auto',
            py: 2,
          }}
        >
          <Container
            component="main"
            maxWidth="lg"
            sx={{
              display: 'flex',
              flex: 1,
            }}
          >
            {children}
          </Container>
        </Sheet>
      </Box>
    </App>
  );
};

export default MasterLayout;
