import { type ReactNode } from 'react';

import { Metadata } from 'next';

export const runtime = 'nodejs'; // 'nodejs' (default) | 'edge'

import MasterLayout from 'components/shared/master-layout';

export const metadata: Metadata = {
  metadataBase: new URL('https://sisa.cafe'),
};

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MasterLayout>{children}</MasterLayout>
      </body>
    </html>
  );
};

export default Layout;
