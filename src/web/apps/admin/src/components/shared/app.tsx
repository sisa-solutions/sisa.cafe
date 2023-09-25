'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { SWRConfig } from 'swr';

import { useReportWebVitals } from 'next/web-vitals';

import { getInitColorSchemeScript } from '@mui/joy/styles/CssVarsProvider';

import { I18nProvider } from '@sisa/i18n';

import { StoreProvider, createRootStore } from 'stores';

import i18n from 'i18n';

import ThemeProvider from 'themes/theme-provider';

type Props = {
  children: ReactNode;
};

// @ts-ignore
const defaultHeadersMiddleware = (useSWRNext) => (key, fetcher, config) => {
  // Before hook runs...

  // Add logger to the original fetcher.
  const extendedFetcher = (input: RequestInfo | URL, init?: RequestInit) => {
    return fetcher(`http://localhost:12000${input}`, {
      ...init,
      headers: {
        ...init?.headers,
        'Content-Type': 'application/json',
      },
    });
  };

  // Handle the next middleware, or the `useSWR` hook if this is the last one.
  const swr = useSWRNext(key, extendedFetcher, config);

  // After hook runs...
  return swr;
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
            <SWRConfig
              value={{
                errorRetryCount: 3,
                fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
                use: [defaultHeadersMiddleware],
              }}
            >
              {props.children}
            </SWRConfig>
          </ThemeProvider>
        </I18nProvider>
      </StoreProvider>
    </>
  );
};

export default App;
