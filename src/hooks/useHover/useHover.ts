import { useEffect, useRef } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';

export type UseHoverProps = {
  isActive?: boolean | (() => boolean | undefined);
  refs: React.RefObject<HTMLElement>[];
  onHover?: (event: MouseEvent) => void;
  onBlur?: (event: MouseEvent) => void;
  blurDelay?: number;
  hoverDelay?: number;
};

export const useHover = ({
  refs,
  onHover,
  onBlur,
  blurDelay = 200,
  hoverDelay = 0,
  isActive,
}: UseHoverProps): void => {
  const blurTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const isHovered = useRef(false);
  const mutableRef = useMutableRef([
    onHover,
    onBlur,
    isActive,
    blurDelay,
    hoverDelay,
  ] as const);

  const getActive = () =>
    typeof mutableRef.current[2] === 'function'
      ? mutableRef.current[2]()
      : mutableRef.current[2];

  const clearTimeouts = () => {
    if (hoverTimeoutId.current) {
      clearTimeout(hoverTimeoutId.current);
      hoverTimeoutId.current = null;
    }
    if (blurTimeoutId.current) {
      clearTimeout(blurTimeoutId.current);
      blurTimeoutId.current = null;
    }
  };

  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      if (!getActive()) {
        return;
      }

      clearTimeouts();

      hoverTimeoutId.current = setTimeout(() => {
        if (!isHovered.current) {
          isHovered.current = true;
          mutableRef.current[0]?.(event);
        }
      }, mutableRef.current[4]);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (!getActive()) {
        return;
      }

      clearTimeouts();

      blurTimeoutId.current = setTimeout(() => {
        if (isHovered.current) {
          isHovered.current = false;
          mutableRef.current[1]?.(event);
        }
      }, mutableRef.current[3]);
    };

    for (const element of refs) {
      element.current?.addEventListener('mouseenter', handleMouseEnter);
      element.current?.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      for (const element of refs) {
        element.current?.removeEventListener('mouseenter', handleMouseEnter);
        element.current?.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeouts();
    };
  }, [refs]);
};
