import { useMutableRef } from '@consta/uikit/useMutableRef';
import { useEffect, useRef } from 'react';

export type UseHoverProps = {
  isActive?: boolean | (() => boolean | undefined);
  refs: Array<React.RefObject<HTMLElement>>;
  onHover?: (event: MouseEvent) => void;
  onBlur?: (event: MouseEvent) => void;
  blurDelay?: number;
  hoverDelay?: number;
};

export const useHover = (props: UseHoverProps): void => {
  const {
    refs,
    onHover,
    onBlur,
    blurDelay = 200,
    hoverDelay = 0,
    isActive,
  } = props;
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

    for (let i = 0; i < refs.length; i++) {
      const element = refs[i].current;
      element?.addEventListener('mouseenter', handleMouseEnter);
      element?.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      for (let i = 0; i < refs.length; i++) {
        const element = refs[i].current;
        element?.removeEventListener('mouseenter', handleMouseEnter);
        element?.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [refs]);
};
