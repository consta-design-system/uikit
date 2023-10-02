import React, { useLayoutEffect, useState } from 'react';

import { isEq } from '##/utils/object';

import { mapping } from './mapping';
import { Map, Returned } from './types';

type DefaultPoints =
  | '5xs'
  | '4xs'
  | '3xs'
  | '2xs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

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

type UseBreakpointsProps<POINTS extends string = DefaultPoints> = {
  isActive?: boolean;
  map?: Map<POINTS>;
  container?: React.RefObject<HTMLElement> | Window;
};

export const useBreakpoints = <POINTS extends string = DefaultPoints>(
  props?: UseBreakpointsProps<POINTS>,
) => {
  const { map, isActive = true, container = window } = props ?? {};
  const pointsMap = map || (defaultMap as Map<POINTS>);

  const [points, setSetPoints] = useState<Returned<POINTS>>(() =>
    mapping(
      container instanceof Window
        ? container.innerWidth
        : container?.current?.offsetWidth ?? 0,
      pointsMap,
    ),
  );

  useLayoutEffect(() => {
    if (isActive) {
      setSetPoints(
        mapping(
          container instanceof Window
            ? container.innerWidth
            : container?.current?.offsetWidth ?? 0,
          pointsMap,
        ),
      );
    }
  }, [container]);

  useLayoutEffect(() => {
    const subscribe = () => {
      const newPoints = mapping(
        container instanceof Window
          ? container.innerWidth
          : container?.current?.offsetWidth ?? 0,
        pointsMap,
      );

      setSetPoints((state) => (isEq(state, newPoints) ? state : newPoints));
    };

    if (isActive) {
      (container instanceof Window
        ? container
        : container?.current
      )?.addEventListener('resize', subscribe);
    }

    return () =>
      (container instanceof Window
        ? container
        : container?.current
      )?.removeEventListener('resize', subscribe);
  }, [isActive, container]);

  return points;
};
