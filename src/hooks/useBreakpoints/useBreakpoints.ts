import { Map, Returned } from './types';
import { useComponentBreakpoints } from './useComponentBreakpoints';
import { useWindowBreakpoints } from './useWindowBreakpoints';

export const useBreakpoints = <POINTS extends string>({
  ref,
  map,
  isActive,
}: {
  ref?: React.RefObject<HTMLElement | SVGGraphicsElement>;
  map: Map<POINTS>;
  isActive?: boolean;
}): Returned<POINTS> => {
  const windowBreakpoints = useWindowBreakpoints({
    map,
    isActive: isActive && !ref,
  });

  const componentBreakpoints = useComponentBreakpoints({
    ref,
    map,
    isActive: isActive && !!ref,
  });

  return ref ? componentBreakpoints : windowBreakpoints;
};
