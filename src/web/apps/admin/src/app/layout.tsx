import { type ReactNode } from 'react';

import { Metadata } from 'next';

export const runtime = 'nodejs'; // 'nodejs' (default) | 'edge'

import App from 'components/shared/app';

export const metadata: Metadata = {
  metadataBase: new URL('https://sisa.cafe'),
};

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <App>{props.children}</App>
      </body>
    </html>
  );
};

export default Layout;
