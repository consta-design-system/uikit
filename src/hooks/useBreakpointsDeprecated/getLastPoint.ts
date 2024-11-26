export const getLastPoint = <POINT extends string>(
  map: Record<POINT, boolean>,
) => {
  const keys = Object.keys(map) as POINT[];

  for (let index = keys.length - 1; index >= 0; index--) {
    if (map[keys[index]]) {
      return keys[index];
    }
  }
};
