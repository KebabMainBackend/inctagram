export {};
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user: {
        id: number;
        username: string;
        email: string;
      } | null;
    }
  }
}
