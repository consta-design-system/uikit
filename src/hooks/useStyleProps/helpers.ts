export const varIsArray = <V extends string | string[] | readonly string[]>(
  v: V,
): v is Exclude<V, string> => Array.isArray(v);

export const varIsString = <V extends string | string[] | readonly string[]>(
  v: V,
): v is Exclude<V, string[] | readonly string[]> => typeof v === 'string';
