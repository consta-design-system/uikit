export const clearUndefined = <T extends Record<string, unknown>>(
  obj: T,
): T => {
  const result = { ...obj };
  for (const key in result) {
    if (result[key] === undefined) {
      delete result[key];
    }
  }
  return result as T;
};
