import { GetDefaultUriDto } from '../default-get-query.uri.dto';
import {
  PAGE_SIZE_DEFAULT,
  SortDirection,
} from '../constants/default-query-params';

type GetRequestMapperHelper<T> = {
  cursor: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
  items: T[];
};

export const getRequestQueryMapper = ({
  pageSize,
  cursor,
  sortDirection,
  sortBy,
}: GetDefaultUriDto) => {
  const data = {
    pageSize: PAGE_SIZE_DEFAULT,
    sortDirection: SortDirection.DESC,
    sortBy: 'createdAt',
    cursor: undefined,
  };
  if (pageSize) {
    data.pageSize = Number(pageSize);
  }
  if (cursor) {
    data.cursor = cursor;
  }
  if (sortDirection) {
    data.sortDirection = sortDirection.toLowerCase() as SortDirection;
  }
  if (sortBy) {
    data.sortBy = sortBy;
  }
  return data;
};
export const getRequestReturnMapper = <T>({
  pageSize,
  cursor,
  totalCount,
  items,
  hasMore,
}: GetRequestMapperHelper<T>) => ({
  pagesCount: Math.ceil(totalCount / pageSize),
  cursor,
  pageSize,
  totalCount,
  hasMore,
  items,
});
