import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Direction } from '##/components/Popover';
import { usePrevious } from '##/hooks/usePrevious';
import { useRefs } from '##/hooks/useRefs';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';

import { ContextMenuItemDefault, ContextMenuPropGetItemSubMenu } from './types';

type UseMenuNavigationProps<ITEM = ContextMenuItemDefault> = {
  items: ITEM[];
  deleteLevel: () => void;
  getItemSubMenu: ContextMenuPropGetItemSubMenu<ITEM>;
  active: boolean;
  addLevel: (item: ITEM) => void;
  onEsc?: React.KeyboardEventHandler;
  level?: number;
  isMobile?: boolean;
};

export const useMenuNavigation = (props: UseMenuNavigationProps) => {
  const {
    items,
    addLevel,
    deleteLevel,
    active,
    getItemSubMenu,
    level = 0,
    onEsc,
    isMobile,
  } = props;

  const [activeIndex, setActiveIndex] = useState(-1);

  const [direction, setDirection] = useState<Direction | undefined>();

  const refs = useRefs<HTMLDivElement>(items.length);

  const containerRef = useRef<HTMLDivElement>(null);

  const parentRef = useRef<HTMLDivElement>(null);

  const previousFlag = usePrevious(active);

  useLayoutEffect(() => {
    setTimeout(() => containerRef.current?.focus(), animateTimeout * 2);
  }, []);

  useLayoutEffect(() => {
    setTimeout(
      () => {
        (activeIndex >= 0 ? refs[activeIndex] : parentRef).current?.focus();
      },
      previousFlag ? animateTimeout * 2 : 0,
    );
    if (active) {
      setTimeout(
        () => {
          containerRef.current?.focus();
        },
        isMobile ? animateTimeout : 0,
      );
    }
  }, [active]);

  useEffect(() => {
    setTimeout(
      () => {
        (activeIndex >= 0 ? refs[activeIndex] : parentRef).current?.focus();
      },
      isMobile ? animateTimeout : 0,
    );
  }, [activeIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const { code } = e;

    if (code === 'ArrowUp') {
      if (isMobile) {
        if (activeIndex - 1 < 0) {
          parentRef && parentRef.current?.focus();
        }
      }
      setActiveIndex(Math.max(activeIndex - 1, isMobile ? -1 : 0));
    }
    if (code === 'ArrowRight' && activeIndex >= 0) {
      if (isMobile) {
        !!getItemSubMenu(items[activeIndex]) && addLevel(items[activeIndex]);
        return;
      }
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
      if (direction?.includes('right') || isMobile) {
        deleteLevel();
      }
    }
    if (code === 'Enter') {
      if (activeIndex >= 0) {
        if (getItemSubMenu(items[activeIndex])) {
          addLevel(items[activeIndex]);
        } else {
          refs[activeIndex].current?.click();
        }
      } else {
        parentRef.current?.click();
      }
    }
    if (code === 'Space') {
      (activeIndex >= 0 ? refs[activeIndex] : parentRef).current?.click();
    }
    if (code === 'Escape') {
      if (level === 0) {
        onEsc?.(e);
      } else {
        deleteLevel();
      }
    }
  };

  return {
    refs,
    activeIndex,
    onKeyDown,
    setActiveIndex,
    setDirection,
    parentRef,
    containerRef,
  };
};
