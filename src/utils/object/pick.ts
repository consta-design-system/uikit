export type PickReturn<T, K extends keyof T> = {
  [Property in K]: T[Property];
};

export const pick = <T extends {}, K extends keyof T>(target: T, keys: K[]) => {
  const result = {} as PickReturn<T, K>;
  for (const key of keys) result[key] = target[key];
  return result;
};
