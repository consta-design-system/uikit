import React, { useEffect } from 'react';

import { useMutableRef } from '../../hooks/useMutableRef/useMutableRef';

const getAllParents = (element: HTMLElement): readonly Node[] => {
  const mutableParents: Node[] = [];
  let currentNode: Node | null = element;

  while (currentNode) {
    currentNode !== element && mutableParents.push(currentNode);
    currentNode = currentNode.parentNode;
  }

  return mutableParents;
};

/** Запрос репозиции поповера при ресайзе окна и скролле */
export const usePopoverReposition = ({
  isActive,
  scrollAnchorRef,
  onRequestReposition,
}: {
  isActive: boolean;
  /** При скролле родителей этого элемента будет запрашиваться репозиция поповера */
  scrollAnchorRef: React.RefObject<HTMLElement | null>;
  onRequestReposition: () => void;
}) => {
  const onRequestRepositionRef = useMutableRef(onRequestReposition);

  useEffect(() => {
    const fn = () => onRequestRepositionRef.current();
    if (isActive) {
      window.addEventListener('resize', fn);

      const allParents = scrollAnchorRef?.current
        ? getAllParents(scrollAnchorRef.current)
        : [];
      allParents.forEach((parentEl) => parentEl.addEventListener('scroll', fn));

      return () => {
        window.removeEventListener('resize', fn);

        allParents.forEach((parentEl) =>
          parentEl.removeEventListener('scroll', fn),
        );
      };
    }
    return undefined;
  }, [scrollAnchorRef]);
};
