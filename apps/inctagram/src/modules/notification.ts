import { ResponseErrorMessageTypes } from '../types/main.types';

export class ResultNotification<T = null> {
  constructor(data: T | null = null) {
    this.data = data;
  }

  extensions: ResponseErrorMessageTypes[] = [];
  code = 0;
  data: T | null = null;

  hasError() {
    return this.code !== 0;
  }

  addError(
    message: string,
    key: string | null = null,
    code: number | null = null,
  ) {
    this.code = code ?? 1;
    this.extensions.push({ message, field: key });
  }

  addData(data: T) {
    this.data = data;
  }
}
