import { SortDirection } from './common';

export const sortStringToParams = (sortBy: string) => {
  return sortBy
    .split(',')
    .flatMap((sort) => {
      const [field, sortDirection] = sort.split(':');

      return [
        {
          // TODO: This is a hack to make the first letter uppercase
          field: field.charAt(0).toUpperCase() + field.slice(1),
          sort:
            sortDirection == 'desc'
              ? SortDirection.SORT_DIRECTION_DESC
              : SortDirection.SORT_DIRECTION_ASC,
        },
      ];
    })
    .filter((sort) => sort.field);
};
