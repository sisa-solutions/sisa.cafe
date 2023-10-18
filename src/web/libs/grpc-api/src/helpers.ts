import { SortDirection } from './common';

export const sortStringToParams = (sortBy: string) => {
  return sortBy
    .split(',')
    .flatMap((sort) => {
      const [field, sortDirection] = sort.split(':');

      return [
        {
          // TODO: This is a hack to make the first letter uppercase
          field,
          sort:
            sortDirection == 'desc'
              ? SortDirection.DESC
              : SortDirection.ASC,
        },
      ];
    })
    .filter((sort) => sort.field);
};
