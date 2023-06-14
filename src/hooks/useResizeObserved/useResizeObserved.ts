import React, { RefObject, useLayoutEffect } from 'react';

export const useResizeObserved = <
  ELEMENT extends HTMLElement | SVGGraphicsElement,
  RETURN_TYPE,
>(
  refs: Array<RefObject<ELEMENT>>,
  mapper: (el: ELEMENT | null) => RETURN_TYPE,
): RETURN_TYPE[] => {
  const [dimensions, setDimensions] = React.useState<RETURN_TYPE[]>(() =>
    refs.map((ref) => mapper(ref.current)),
  );

  // Храним маппер в рефке, чтобы если его передадут инлайн-функцией, это не вызвало бесконечные перерендеры
  const mapperRef = React.useRef(mapper);
  useLayoutEffect(() => {
    mapperRef.current = mapper;
  }, [mapper]);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setDimensions(refs.map((ref) => mapperRef.current(ref.current)));
    });

    for (const ref of refs) {
      ref.current && resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [refs]);

  return dimensions;
};
