import { useLayoutEffect, useMemo, useState } from 'react';

import { useRefs } from '##/hooks/useRefs';

import {
  BookmarkTabsItemDefault,
  BookmarkTabsPropGetItemFixed,
  BookmarkTabsPropSize,
} from './types';

type UseBookmarkTabsProps<ITEM = BookmarkTabsItemDefault> = {
  items: ITEM[];
  getItemFixed: BookmarkTabsPropGetItemFixed<ITEM>;
  withNavigationButtons?: boolean;
  withAddButton?: boolean;
  size: BookmarkTabsPropSize;
};

const MAX_TAB_SIZE = 200;

export const useBookmarkTabs = <ITEM>(props: UseBookmarkTabsProps<ITEM>) => {
  const { items, getItemFixed, withNavigationButtons } = props;

  const refs = useRefs<HTMLElement>(items.length);

  const [
    wrapperRef,
    containerRef,
    fixedTabsRef,
    otherTabsRef,
    controlsRef,
    addButtonRef,
  ] = useRefs<HTMLDivElement>(6);

  const [sizes, setSizes] = useState<string[]>([]);

  const [showControls, setShowControls] = useState(false);

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

  useLayoutEffect(() => {
    const refs = [
      containerRef,
      fixedTabsRef,
      wrapperRef,
      otherTabsRef,
      controlsRef,
    ];
    const resizeObserver = new ResizeObserver(() => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const fixedWidth = fixedTabsRef.current?.offsetWidth ?? 0;

      const showControls =
        (fixedTabsRef.current?.scrollWidth ?? 0) +
          (otherTabsRef.current?.scrollWidth ?? 0) >
          containerWidth - (addButtonRef.current?.offsetWidth ?? 0) &&
        !!withNavigationButtons;

      const otherWidth =
        containerWidth -
        (controlsRef.current?.offsetWidth ?? 0) -
        (addButtonRef.current?.offsetWidth ?? 0) -
        fixedWidth;

      const itemSize = `${
        otherWidth
          ? Math.min(otherWidth / otherTabs.length, MAX_TAB_SIZE)
          : MAX_TAB_SIZE
      }px`;
      setSizes(Array.from<string>({ length: otherTabs.length }).fill(itemSize));
      setShowControls(showControls);
    });

    for (const ref of refs) {
      ref.current && resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    otherTabs.length,
    fixedTabs.length,
    withNavigationButtons,
    wrapperRef.current,
    containerRef.current,
    fixedTabsRef.current,
    controlsRef.current,
  ]);

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
    controlsRef,
    addButtonRef,
  };
};
