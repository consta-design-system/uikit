import { useCallback, useEffect, useState } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';
import { isEq } from '##/utils/object/isEq';

import { mapping } from './mapping';
import { Map, Returned } from './types';

export const useComponentBreakpoints = <POINTS extends string>({
  ref,
  map,
  isActive,
}: {
  ref?: React.RefObject<HTMLElement | SVGGraphicsElement>;
  map: Map<POINTS>;
  isActive?: boolean;
}) => {
  const mapRef = useMutableRef(map);
  const mappingRun = useCallback(
    () =>
      mapping(ref?.current?.getBoundingClientRect().width || 0, mapRef.current),
    [],
  );
  const [points, setSetPoints] = useState<Returned<POINTS>>(mappingRun);

  useEffect(() => {
    mappingRun();

    const resizeObserver = new ResizeObserver(() => {
      const newPoints = mappingRun();
      setSetPoints((state) => (isEq(state, newPoints) ? state : newPoints));
    });

    isActive && ref?.current && resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref?.current, isActive]);

  return points;
};
