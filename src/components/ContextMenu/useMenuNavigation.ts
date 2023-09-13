import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Direction } from '##/components/Popover';
import { usePrevious } from '##/hooks/usePrevious';
import { useRefs } from '##/hooks/useRefs';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';

import { ContextMenuPropGetSubItems } from '../ContextMenuDeprecated/helpers';
import { ContextMenuItemDefault } from './types';

type UseMenuNavigationProps<ITEM = ContextMenuItemDefault> = {
  items: ITEM[];
  deleteLevel: () => void;
  getItemSubMenu: ContextMenuPropGetSubItems<ITEM>;
  active: boolean;
  addLevel: (item: ITEM) => void;
};

export const useMenuNavigation = (props: UseMenuNavigationProps) => {
  const { items, addLevel, deleteLevel, active, getItemSubMenu } = props;

  const [activeIndex, setActiveIndex] = useState(-1);

  const [direction, setDirection] = useState<Direction | undefined>();

  const refs = useRefs<HTMLDivElement>(items.length);

  const containerRef = useRef<HTMLDivElement>(null);

  const previousFlag = usePrevious(active);

  useLayoutEffect(() => {
    setTimeout(() => containerRef.current?.focus(), animateTimeout);
  }, []);

  useLayoutEffect(() => {
    setTimeout(
      () => {
        activeIndex >= 0 && refs[activeIndex].current?.focus();
      },
      previousFlag ? animateTimeout : 0,
    );
  }, [active]);

  useEffect(() => {
    if (activeIndex >= 0) {
      refs[activeIndex].current?.focus();
    }
  }, [activeIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const { code } = e;

    if (code === 'ArrowUp') {
      setActiveIndex(Math.max(activeIndex - 1, 0));
    }
    if (code === 'ArrowRight' && activeIndex >= 0) {
      if (direction?.includes('left') && !getItemSubMenu(items[activeIndex])) {
        deleteLevel();
      } else {
        addLevel(items[activeIndex]);
      }
    }
    if (code === 'ArrowDown') {
      setActiveIndex(Math.min(activeIndex + 1, items.length - 1));
    }
    if (code === 'ArrowLeft') {
      if (direction?.includes('right')) {
        deleteLevel();
      }
    }
    if (code === 'Enter' && activeIndex >= 0) {
      if (getItemSubMenu(items[activeIndex])) {
        addLevel(items[activeIndex]);
      } else {
        refs[activeIndex].current?.click();
      }
    }
    if (code === 'Space' && activeIndex >= 0) {
      refs[activeIndex].current?.click();
    }
    if (code === 'Escape') {
      deleteLevel();
    }
  };

  return {
    refs,
    activeIndex,
    onKeyDown,
    setActiveIndex,
    setDirection,
    containerRef,
  };
};
