export function getCookieValue(cookieString: string, name: string) {
  const cookies = cookieString.split('; ');
  if (cookies[0]) return cookies[0];
  else null;
  // for (const cookie of cookies) {
  //   const [key, value] = cookie.split('=');
  //   if (key === name) {
  //     return value;
  //   }
  // }
  // return null;
}
