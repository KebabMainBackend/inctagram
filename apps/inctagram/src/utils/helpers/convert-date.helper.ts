export const convertDMYtoYMD = (date: string) => {
  const parts = date.split('-');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  return `${year}-${month}-${day}`;
};
