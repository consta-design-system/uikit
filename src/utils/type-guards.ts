export const isDefined = <T>(p: T): p is Exclude<T, undefined> =>
  p !== undefined;

export const isNotNil = <T>(p: T): p is Exclude<T, undefined | null> =>
  p !== undefined && p !== null;

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';
