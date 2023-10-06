import { useCallback, useEffect } from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const useQueryString = <QueryObject extends Record<string, string | number>>(
  initParams?: QueryObject
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (initParams) {
      const pararms = new URLSearchParams(searchParams);

      Object.keys(initParams).forEach((key) => {
        const value = initParams[key];

        if (value) {
          pararms.set(key, value.toString());
        }
      });

      router.push(`${pathname}?${pararms.toString()}`);
    }
  }, [initParams]);
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const setQueryString = useCallback(
    (newParams: Partial<QueryObject>) => {
      const pararms = new URLSearchParams(searchParams);

      Object.keys(newParams).forEach((key) => {
        const value = newParams[key];

        if (value) {
          pararms.set(key, value.toString());
        } else {
          pararms.delete(key);
        }
      });

      router.push(`${pathname}?${pararms.toString()}`);
    },
    [searchParams]
  );

  return setQueryString;
};

export default useQueryString;
