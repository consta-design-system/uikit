import React, { useState, useEffect } from 'react';
import { getAnchor } from '../../components/mpss/Popover/utils/popover-utils';

export const useHoverEffect = (
  ref: React.RefObject<HTMLElement | React.Component | null>,
  enterTimeout?: number,
  leaveTimeout?: number,
) => {
  const [value, setValue] = useState(false);
  let mouseOverTimeout: number | undefined = undefined;
  let mouseLeaveTimeout: number | undefined = undefined;

  const handleMouseOver = enterTimeout
    ? () => {
        clearTimeout(mouseLeaveTimeout);
        mouseOverTimeout = window.setTimeout(() => setValue(true), enterTimeout);
      }
    : () => {
        clearTimeout(mouseLeaveTimeout);
        setValue(true);
      };
  const handleMouseOut = leaveTimeout
    ? () => {
        clearTimeout(mouseOverTimeout);
        mouseLeaveTimeout = window.setTimeout(() => setValue(false), leaveTimeout);
      }
    : () => {
        clearTimeout(mouseOverTimeout);
        setValue(false);
      };

  useEffect(() => {
    const node = getAnchor(ref.current);
    if (node) {
      node.addEventListener('mouseover', handleMouseOver, { passive: false });
      node.addEventListener('mouseout', handleMouseOut, { passive: false });

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
        clearTimeout(mouseOverTimeout);
        clearTimeout(mouseLeaveTimeout);
      };
    }
  }, [ref.current]);

  return value;
};
