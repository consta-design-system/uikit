import React, { RefObject } from 'react';

export const useResizeObserved = <ELEMENT extends HTMLElement | SVGGraphicsElement, RETURN_TYPE>(
  refs: Array<RefObject<ELEMENT>>,
  mapper: (el: ELEMENT | null) => RETURN_TYPE,
): RETURN_TYPE[] => {
  const refsMapper = React.useCallback((ref: RefObject<ELEMENT>) => mapper(ref.current), [mapper]);
  const [dimensions, setDimensions] = React.useState<RETURN_TYPE[]>(() => refs.map(refsMapper));

  React.useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setDimensions(refs.map(refsMapper));
    });

    for (const ref of refs) {
      ref.current && resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [refs, refsMapper]);

  return dimensions;
};
