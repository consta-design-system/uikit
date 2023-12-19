import { Map, Returned } from './types';

export const sortObj = <T extends {}>(obj: T) =>
  Object.fromEntries(
    (Object.entries(obj) as [string, number][]).sort((a, b) => a[1] - b[1]),
  ) as T;

export const mapping = <POINTS extends string>(
  width: number,
  map: Map<POINTS>,
): Returned<POINTS> => {
  const points = {} as Returned<POINTS>;

  for (const key in sortObj(map)) {
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      points[key] = width >= map[key];
    }
  }

  return points;
};
