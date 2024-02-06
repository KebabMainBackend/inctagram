export const createErrorMessage = (message: string, field: string) => ({
  message: [
    {
      message,
      field,
    },
  ],
});
