export const sortGroupByDay = (
  a: { key: string | number },
  b: { key: string | number },
) => {
  if (a.key < b.key) {
    return 1;
  }
  if (a.key > b.key) {
    return -1;
  }
  return 0;
};
