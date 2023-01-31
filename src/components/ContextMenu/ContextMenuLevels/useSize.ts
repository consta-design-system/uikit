import { useEffect, useLayoutEffect } from 'react';

import { ComponentSize, getElementSize } from '##/hooks/useComponentSize';
import { useMutableRef } from '##/hooks/useMutableRef';

export const useSize = (
  refs: React.RefObject<HTMLDivElement>[],
  setFn: React.Dispatch<React.SetStateAction<ComponentSize>>,
  isActive?: boolean,
) => {
  const setRef = useMutableRef((newState: ComponentSize) => {
    if (!isActive) {
      return;
    }

    setFn((oldState) => {
      if (
        newState.height &&
        newState.width &&
        (oldState.height !== newState.height ||
          oldState.width !== newState.width)
      ) {
        return newState;
      }
      return oldState;
    });
  });

  const elementRef = refs?.[refs.length - 1];

  useLayoutEffect(() => {
    setRef.current(getElementSize(elementRef?.current));
  }, [elementRef]);

  useEffect(() => {
    const element = elementRef?.current;

    const resizeObserver = new ResizeObserver((res) => {
      setRef.current(getElementSize(res[0].target as HTMLElement));
    });

    element && resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRef]);
};
