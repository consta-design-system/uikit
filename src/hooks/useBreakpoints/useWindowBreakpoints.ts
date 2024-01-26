import { useCallback, useEffect, useState } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';
import { isEq } from '##/utils/object';

import { mapping } from './mapping';
import { Map, Returned } from './types';

export const useWindowBreakpoints = <POINTS extends string>({
  isActive,
  map,
}: {
  isActive?: boolean;
  map: Map<POINTS>;
}) => {
  const mapRef = useMutableRef(map);
  const mappingRun = useCallback(
    () => mapping(window.innerWidth, mapRef.current),
    [],
  );
  const [points, setPoints] = useState<Returned<POINTS>>(mappingRun);

  useEffect(() => {
    mappingRun();

    const subscribe = () => {
      const newPoints = mappingRun();

      setPoints((state) => (isEq(state, newPoints) ? state : newPoints));
    };

    isActive && window.addEventListener('resize', subscribe);

    return () => window.removeEventListener('resize', subscribe);
  }, [isActive]);

  return points;
};
