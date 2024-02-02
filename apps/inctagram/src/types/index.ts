export {};
declare global {
  namespace Express {
    export interface Request {
      user: {
        id: number;
        login: string;
        email: string;
      } | null;
    }
  }
}
