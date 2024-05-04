import { SortDirection } from './default-query-params';

export const responseErrorObjectExample = {
  errorsMessages: [
    {
      message: 'string',
      field: 'string',
    },
  ],
};

export const NoContentResponseOptions = {
  description: 'success',
};
export const NotFoundResponseOptions = {
  description: 'Not Found',
};
export const BadRequestResponseOptions = {
  description: 'Incorrect input data',
  content: {
    'application/json': { example: responseErrorObjectExample },
  },
};
export const TooManyRequestsResponseOptions = {
  description: 'More than 5 attempts from one IP-address during 10 seconds',
};
export const UnauthorizedRequestResponseOptions = {
  description: 'Unauthorized',
};
export const ForbiddenRequestResponseOptions = {
  description: 'Forbidden',
};

export const PageSizeQueryOptions = {
  name: 'pageSize',
  description: 'page size is number of items that should be returned',
  type: 'number',
  required: false,
};
export const SortByQueryOptions = {
  name: 'sortBy',
  description: 'Sort by parameters',
  type: 'string',
  required: false,
};
export const SortDirectionQueryOptions = {
  name: 'sortDirection',
  description: 'Sort by desc or asc',
  type: 'string',
  enum: SortDirection,
  required: false,
};

export const UserIdQueryOptions = {
  name: 'userId',
  description: 'user id',
  type: 'string',
  required: false,
};

export const CursorQueryOptions = (description: string) => ({
  name: 'cursor',
  description,
  type: 'string',
  required: false,
});
