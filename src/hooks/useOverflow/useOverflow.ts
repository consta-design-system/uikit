import React, { useEffect, useState } from 'react';

import { useComponentSize } from '../useComponentSize/useComponentSize';

type Props = {
  currentRef: React.RefObject<HTMLElement>;
  containerRef?: React.RefObject<HTMLElement> | Document | Window;
};

const getMaxWidth = (
  element: React.RefObject<HTMLElement> | HTMLElement | Document | Window,
): number => {
  if (element instanceof Window) {
    return element.outerWidth;
  }
  if (element instanceof Document) {
    return element.documentElement.offsetWidth;
  }
  if (element instanceof HTMLElement) {
    return element.offsetWidth;
  }
  if (element.current) {
    return element.current.offsetWidth;
  }
  return 0;
};

export const useOverflow = (props: Props): boolean => {
  const { currentRef, containerRef } = props;

  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  const size = useComponentSize(currentRef);

  useEffect(() => {
    const container = containerRef || currentRef.current?.parentElement;
    if (container) {
      if (getMaxWidth(container) <= size.width) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
    }
  }, [{ ...size }]);

  return isOverflow;
};
