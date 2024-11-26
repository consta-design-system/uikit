import { useEffect, useLayoutEffect, useState } from 'react';

import { useRefs } from '../../../../hooks/useRefs/useRefs';

type ItemDimensions = { height: number; offset: number };

export const useScrollToElement = (
  items: { selected?: boolean }[],
  scrollWrapper: React.RefObject<HTMLDivElement>,
) => {
  const [itemDimensions, setItemDimensions] = useState<ItemDimensions[]>([]);

  const itemsRefs = useRefs<HTMLDivElement>(items.length);

  useEffect(() => {
    const selectedItemIndex = items.findIndex((item) => item.selected);

    scrollWrapper.current?.scrollTo?.({
      top: itemDimensions?.[selectedItemIndex]?.offset || 0,
      behavior: 'smooth',
    });
  });

  useLayoutEffect(() => {
    const itemDimensions = itemsRefs.reduce<ItemDimensions[]>(
      (accumulator, currentValue, index) => {
        const height = currentValue.current?.offsetHeight || 0;
        const offset =
          accumulator.length > 0 ? accumulator[index - 1].offset + height : 0;

        return [
          ...accumulator,
          {
            height,
            offset,
          },
        ];
      },
      [],
    );

    setItemDimensions(itemDimensions);
  }, [itemsRefs]);

  return [itemsRefs];
};
