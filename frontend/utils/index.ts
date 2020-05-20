export const offsetFromQuery = (query: any, page = 10) => {
  let offset = query?.page ?? 0;
  offset -= 1;
  offset *= page;
  return `offset=${offset}`;
};
