import { CookieOptions } from 'express';

export const cookieOptions = (domain: string): CookieOptions => ({
  httpOnly: false,
  secure: true,
  sameSite: 'none',
  maxAge: 60 * 60 * 1000,
  // domain,
});
