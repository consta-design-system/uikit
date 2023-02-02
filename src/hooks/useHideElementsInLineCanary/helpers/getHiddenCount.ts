export const getHiddenCount = (map: boolean[]) =>
  map.filter((item) => !item).length;
