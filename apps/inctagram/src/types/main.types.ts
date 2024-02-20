export type PaginationAndSortingTypes = {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: 'ASC' | 'DESC';
};

export type IncomingPaginationAndSortingTypes = {
  pageNumber: string;
  pageSize: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
};

export type ReturnPaginatedAndSortedWithItemsTypes = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
};

export type ResponseErrorMessageTypes = {
  field: string;
  message: string;
};

export type ExceptionResponseType = {
  statusCode: number;
  message: ResponseErrorMessageTypes[];
  error: string;
};
