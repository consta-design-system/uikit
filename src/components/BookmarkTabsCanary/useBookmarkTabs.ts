import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useDebounce } from '##/hooks/useDebounce';
import { useRefs } from '##/hooks/useRefs';

import {
  BookmarkTabsItemDefault,
  BookmarkTabsPropGetItemFixed,
  BookmarkTabsPropSize,
} from './types';

type UseBookmarkTabsProps<ITEM = BookmarkTabsItemDefault> = {
  items: ITEM[];
  getItemFixed: BookmarkTabsPropGetItemFixed<ITEM>;
  fitMode?: 'scroll' | 'buttons';
  withAddButton?: boolean;
  size: BookmarkTabsPropSize;
};

const MAX_TAB_SIZE = 200;

export const useBookmarkTabs = <ITEM>(props: UseBookmarkTabsProps<ITEM>) => {
  const { items, getItemFixed, fitMode, withAddButton, size } = props;

  const refs = useRefs<HTMLElement>(items.length);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedTabsRef = useRef<HTMLDivElement>(null);
  const otherTabsRef = useRef<HTMLDivElement>(null);

  const controlSize = size === 'm' ? 40 : 32;

  const { width: containerWidth } = useComponentSize(containerRef);
  const { width: fixedWidth } = useComponentSize(fixedTabsRef);
  const { width } = useComponentSize(wrapperRef);

  const [showControls, setShowControls] = useState(false);
  const [showControlsDebounced, setShowControlsDebounced] = useState(false);
  const debounceSetShowControls = useDebounce(setShowControls, 200);

  const { fixedTabs, otherTabs } = useMemo(() => {
    const fixedTabs: ITEM[] = [];
    const otherTabs: ITEM[] = [];

    items.forEach((item) => {
      if (getItemFixed(item)) {
        fixedTabs.push(item);
      } else {
        otherTabs.push(item);
      }
    });

    return {
      fixedTabs,
      otherTabs,
    };
  }, [items, getItemFixed]);

  const sizes = useMemo(() => {
    const { length } = otherTabs;
    const otherWidth = containerWidth
      ? containerWidth -
        controlSize * ((withAddButton ? 1 : 0) + (showControls ? 2 : 0)) -
        fixedWidth
      : 0;
    const itemSize = `${otherWidth ? otherWidth / length : MAX_TAB_SIZE}px`;
    return Array.from<string>({ length }).fill(itemSize);
  }, [containerWidth, width, otherTabs, showControls]);

  useEffect(
    () => debounceSetShowControls(showControlsDebounced),
    [showControlsDebounced],
  );

  useLayoutEffect(() => {
    setShowControlsDebounced(
      (fixedTabsRef.current?.scrollWidth ?? 0) +
        (otherTabsRef.current?.scrollWidth ?? 0) >
        containerWidth - controlSize * 1 && fitMode !== 'scroll',
    );
  }, [width, fixedTabs.length, otherTabs.length, fitMode]);

  const navigate = (type: 'next' | 'prev') => {
    const container = wrapperRef.current;
    if (container) {
      for (let i = 0; i < refs.length; i++) {
        const ref = refs[i];
        if (ref.current) {
          if (
            ref.current.offsetLeft >=
            container.offsetLeft + container.scrollLeft
          ) {
            const index = i + (type === 'next' ? 1 : -1);
            const node = refs[index]?.current;
            if (node) {
              container.scrollTo({
                left: node.offsetLeft - container.offsetLeft,
                behavior: 'smooth',
              });
            }
            return;
          }
        }
      }
    }
  };

  return {
    refs,
    containerRef,
    wrapperRef,
    fixedTabsRef,
    otherTabsRef,
    showControls,
    fixedTabs,
    otherTabs,
    navigate,
    sizes,
  };
};
