export { Combinator } from './generated/sisa/libs/common/enums/combinator';
export { Operator } from './generated/sisa/libs/common/enums/operator';
export { SortDirection } from './generated/sisa/libs/common/enums/sort_direction';

export type {
  FilterRule,
  FilteringParams,
} from './generated/sisa/libs/data/params/filtering_params';
export { SortingParams } from './generated/sisa/libs/data/params/sorting_params';
import { PagingParams } from './generated/sisa/libs/data/params/paging_params';

export { PagingParams };

export type { PagingResponse } from './generated/sisa/libs/common/responses/paging_response';

export const DEFAULT_PAGING_PARAMS: PagingParams = {
  pageIndex: 0,
  pageSize: 10,
};
