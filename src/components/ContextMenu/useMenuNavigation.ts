import React, { useEffect, useLayoutEffect, useState } from 'react';

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
  const {
    items,

    addLevel,
    deleteLevel,
    active,
    getItemSubMenu,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const refs = useRefs<HTMLDivElement>(items.length);

  const previousFlag = usePrevious(active);

  useLayoutEffect(() => {
    setTimeout(
      () => {
        refs[activeIndex].current?.focus();
      },
      previousFlag ? animateTimeout : 0,
    );
  }, [active]);

  useEffect(() => {
    refs[activeIndex].current?.focus();
  }, [activeIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const { code } = e;

    if (code === 'ArrowUp') {
      setActiveIndex(Math.max(activeIndex - 1, 0));
    }
    if (code === 'ArrowRight') {
      addLevel(items[activeIndex]);
    }
    if (code === 'ArrowDown') {
      setActiveIndex(Math.min(activeIndex + 1, items.length - 1));
    }
    if (code === 'ArrowLeft') {
      deleteLevel();
    }
    if (code === 'Enter') {
      if (getItemSubMenu(items[activeIndex])) {
        addLevel(items[activeIndex]);
      } else {
        refs[activeIndex].current?.click();
      }
    }
    if (code === 'Space') {
      refs[activeIndex].current?.click();
    }
  };

  return {
    refs,
    onKeyDown,
  };
};
