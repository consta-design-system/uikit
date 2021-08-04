import React from 'react';

export type ScrollPosition = {
  scrollLeft: number;
  scrollTop: number;
};

export const useScrollPosition = (el: HTMLElement | null): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = React.useState<ScrollPosition>(
    el
      ? getScrollPosition(el)
      : {
          scrollLeft: 0,
          scrollTop: 0,
        },
  );

  React.useEffect(() => {
    if (!el) return;

    const handleScroll = () => setScrollPosition(getScrollPosition(el));
    el.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => el.removeEventListener('scroll', handleScroll);
  }, [el]);

  return scrollPosition;
};

const getScrollPosition = (el: HTMLElement): ScrollPosition => ({
  scrollLeft: el.scrollLeft,
  scrollTop: el.scrollTop,
});
