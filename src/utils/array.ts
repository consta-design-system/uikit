export const sortBy = <T extends {}>(array: T[], param: keyof T, order: 'asc' | 'desc' = 'asc') => {
  return [...array].sort((a, b) => (order === 'desc' ? -1 : 1) * (a[param] < b[param] ? -1 : 1));
};

export const updateAt = <T>(array: T[], index: number, newItem: T): T[] => {
  return index >= array.length
    ? array
    : [...array.slice(0, index), newItem, ...array.slice(index + 1, array.length)];
};

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

export const groupBy = <T, K extends keyof any>(array: T[], iteratee: (elem: T) => K) =>
  array.reduce((result, value) => {
    const key = iteratee(value);

    return {
      ...result,
      [key]: result[key] ? [...result[key], value] : [value],
    };
  }, {} as Record<K, T[]>);
