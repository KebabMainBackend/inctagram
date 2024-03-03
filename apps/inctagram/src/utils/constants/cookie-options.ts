import { CookieOptions } from 'express';

export const CookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};
