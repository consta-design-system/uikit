export const sortBy = <T extends {}>(
  array: T[],
  param: keyof T,
  order: 'asc' | 'desc' = 'asc',
  sortFn = (a: T[keyof T], b: T[keyof T]): number => (a < b ? -1 : 1),
): T[] => {
  const compareFn = (a: T, b: T): number =>
    (order === 'desc' ? -1 : 1) * sortFn(a[param], b[param]);

  return [...array].sort(compareFn);
};

export const updateAt = <T>(
  array: T[],
  index: number,
  newItem: T,
  isExpand = false,
): T[] => {
  const fixedIndex = index < 0 ? 0 : index;
  if (fixedIndex >= array.length) {
    return isExpand ? [...array, newItem] : array;
  }
  return [
    ...array.slice(0, fixedIndex),
    newItem,
    ...array.slice(fixedIndex + (isExpand ? 0 : 1), array.length),
  ];
};

export const putBefore = <T>(array: T[], index: number, newItem: T): T[] =>
  updateAt(array, index, newItem, true);

export const range = (n: number): number[] => [...Array(n).keys()];

export const chunk = <T>(array: T[], size: number): T[][] => {
  let index = 0;
  let resIndex = 0;

  const result: T[][] = [];

  while (index < array.length) {
    result[resIndex++] = array.slice(index, (index += size));
  }

  return result;
};

export const groupBy = <T, K extends keyof any>(
  array: T[],
  iteratee: (elem: T) => K,
) =>
  array.reduce((result, value) => {
    const key = iteratee(value);

    return {
      ...result,
      [key]: result[key] ? [...result[key], value] : [value],
    };
  }, {} as Record<K, T[]>);
