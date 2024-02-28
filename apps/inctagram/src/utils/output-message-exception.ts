export const outputMessageException = (
  message: string,
  field: string,
): OutputExceptionType => {
  return {
    message: message,
    field: field,
  };
};

export interface OutputExceptionType {
  message: string;
  field: string;
}
