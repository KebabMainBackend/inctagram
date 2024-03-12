import { CookieOptions } from 'express';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 3600,
};
