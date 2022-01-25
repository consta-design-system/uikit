import { useLayoutEffect, useState } from 'react';

type Map<POINTS extends string> = Record<POINTS, number>;
type Returned<POINTS extends string> = Record<POINTS, boolean>;

const defaultPoints = [
  '5xs',
  '4xs',
  '3xs',
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
] as const;

type DefaultPoints = typeof defaultPoints[number];

const defaultMap: Map<DefaultPoints> = {
  '5xs': 320,
  '4xs': 360,
  '3xs': 480,
  '2xs': 720,
  'xs': 960,
  's': 1020,
  'm': 1200,
  'l': 1400,
  'xl': 1600,
  '2xl': 1800,
  '3xl': 2000,
  '4xl': 2200,
  '5xl': 2400,
};

const mapping = <POINTS extends string>(width: number, map: Map<POINTS>): Returned<POINTS> => {
  const points = {} as Returned<POINTS>;

  for (const key in map) {
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      points[key] = width >= map[key];
    }
  }

  return points;
};

const isEq = <POINTS extends string>(state: Returned<POINTS>, newState: Returned<POINTS>) => {
  let eq = true;
  for (const key in newState) {
    if (state[key] !== newState[key]) {
      eq = false;
      return eq;
    }
  }
  return eq;
};

export const useBreakpoints = <POINTS extends string = DefaultPoints>(map?: Map<POINTS>) => {
  const pointsMap = map || (defaultMap as Map<POINTS>);

  const [points, setSetPoints] = useState<Returned<POINTS>>(() =>
    mapping(document.documentElement.clientWidth, pointsMap),
  );

  useLayoutEffect(() => {
    const subscribe = () => {
      const newPoints = mapping(document.documentElement.clientWidth, pointsMap);

      setSetPoints((state) => (isEq(state, newPoints) ? state : newPoints));
    };

    window.addEventListener('resize', subscribe);

    return () => window.removeEventListener('resize', subscribe);
  }, []);

  return points;
};
