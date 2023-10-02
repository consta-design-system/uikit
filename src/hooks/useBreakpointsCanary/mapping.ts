import { Map, Returned } from './types';

export const mapping = <POINTS extends string>(
  width: number,
  map: Map<POINTS>,
): Returned<POINTS> => {
  const points = {} as Returned<POINTS>;

  for (const key in map) {
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      points[key] = width >= map[key];
    }
  }

  return points;
};
