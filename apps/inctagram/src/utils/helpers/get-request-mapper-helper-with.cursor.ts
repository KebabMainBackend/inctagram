import {
  GetDefaultUriDtoWithCursor,
  GetDefaultUriDtoWithPageNumber,
} from '../default-get-query.uri.dto';
import {
  PAGE_NUMBER_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_DEFAULT__LARGE,
  SortDirection,
} from '../constants/default-query-params';

type GetRequestMapperHelperWithCursor<T> = {
  cursor: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
  items: T[];
};

type GetRequestMapperHelperWithPageNumber<T> = {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  items: T[];
};

export const getRequestQueryMapperWithCursor = ({
  pageSize,
  cursor,
  sortDirection,
  sortBy,
}: GetDefaultUriDtoWithCursor) => {
  const data = {
    pageSize: PAGE_SIZE_DEFAULT,
    sortDirection: SortDirection.DESC,
    sortBy: 'createdAt',
    cursor: undefined,
    pageNumber: PAGE_NUMBER_DEFAULT,
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

export const getRequestQueryMapperWithPageNumber = ({
  pageSize,
  sortDirection,
  sortBy,
  pageNumber,
}: GetDefaultUriDtoWithPageNumber) => {
  const data = {
    pageSize: PAGE_SIZE_DEFAULT__LARGE,
    sortDirection: SortDirection.DESC,
    sortBy: 'createdAt',
    pageNumber: PAGE_NUMBER_DEFAULT,
  };
  if (pageSize) {
    data.pageSize = Number(pageSize);
  }
  if (pageNumber) {
    data.pageNumber = Number(pageNumber);
  }
  if (sortDirection) {
    data.sortDirection = sortDirection.toLowerCase() as SortDirection;
  }
  if (sortBy) {
    data.sortBy = sortBy;
  }
  return data;
};
export const getRequestReturnMapperWithCursor = <T>({
  pageSize,
  cursor,
  totalCount,
  items,
  hasMore,
}: GetRequestMapperHelperWithCursor<T>) => ({
  pagesCount: Math.ceil(totalCount / pageSize),
  cursor,
  pageSize,
  totalCount,
  hasMore,
  items,
});

export const getRequestReturnMapperWithPageNumber = <T>({
  pageSize,
  pageNumber,
  totalCount,
  items,
}: GetRequestMapperHelperWithPageNumber<T>) => ({
  pagesCount: Math.ceil(totalCount / pageSize),
  pageNumber,
  pageSize,
  totalCount,
  items,
});
