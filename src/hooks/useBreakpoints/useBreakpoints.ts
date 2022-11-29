import { useLayoutEffect, useState } from 'react';

import { isEq } from './isEq';
import { mapping } from './mapping';
import { Map, Returned } from './types';

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

export const useBreakpoints = <POINTS extends string = DefaultPoints>(
  map?: Map<POINTS>,
) => {
  const pointsMap = map || (defaultMap as Map<POINTS>);

  const [points, setSetPoints] = useState<Returned<POINTS>>(() =>
    mapping(window.innerWidth, pointsMap),
  );

  useLayoutEffect(() => {
    const subscribe = () => {
      const newPoints = mapping(window.innerWidth, pointsMap);

      setSetPoints((state) => (isEq(state, newPoints) ? state : newPoints));
    };

    window.addEventListener('resize', subscribe);

    return () => window.removeEventListener('resize', subscribe);
  }, []);

  return points;
};
