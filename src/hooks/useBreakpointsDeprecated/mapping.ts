import { Map, Returned } from './types';

export const sortMap = <POINTS extends string>(map: Map<POINTS>) =>
  Object.fromEntries(
    (Object.entries(map) as [string, number][]).sort((a, b) => a[1] - b[1]),
  ) as Map<POINTS>;

export const mapping = <POINTS extends string>(
  width: number,
  map: Map<POINTS>,
): Returned<POINTS> => {
  const points = {} as Returned<POINTS>;

  for (const key in sortMap(map)) {
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      points[key] = width >= map[key];
    }
  }

  return points;
};
