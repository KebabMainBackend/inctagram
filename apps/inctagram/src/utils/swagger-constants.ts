export const responseErrorObjectExample = {
  errorsMessages: [
    {
      message: 'string',
      field: 'string',
      // 'email must match /^[\\\\w-.]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}$/ regular expression',
      // field: 'email',
    },
  ],
};

export const NoContentResponseOptions = {
  description: 'success',
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
