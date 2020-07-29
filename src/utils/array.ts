export const sortBy = <T extends {}>(array: T[], param: keyof T, order: 'asc' | 'desc' = 'asc') => {
  return [...array].sort((a, b) => (order === 'desc' ? -1 : 1) * (a[param] < b[param] ? -1 : 1));
};

export const updateAt = <T>(array: T[], index: number, newItem: T): T[] => {
  return index >= array.length
    ? array
    : [...array.slice(0, index), newItem, ...array.slice(index + 1, array.length)];
};
