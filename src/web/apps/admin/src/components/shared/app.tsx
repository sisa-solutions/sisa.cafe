'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useReportWebVitals } from 'next/web-vitals';

import { getInitColorSchemeScript } from '@mui/joy/styles/CssVarsProvider';

import { I18nProvider } from '@sisa/i18n';

import { StoreProvider, createRootStore } from 'stores';

import { i18n } from 'i18n';

import ThemeProvider from 'themes/theme-provider';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

const App = (props: Props) => {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  const pathname = usePathname();

  const rootStore = createRootStore({
    pathName: pathname,
  });

  return (
    <>
      {getInitColorSchemeScript({
        defaultMode: 'system',
      })}
      <StoreProvider value={rootStore}>
        <I18nProvider i18n={i18n}>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              {props.children}
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
        </I18nProvider>
      </StoreProvider>
    </>
  );
};

export default App;
