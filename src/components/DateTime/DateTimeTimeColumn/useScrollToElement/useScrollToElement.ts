import { useEffect, useLayoutEffect, useState } from 'react';

import { useRefs } from '../../../../hooks/useRefs/useRefs';

type ItemDimentions = { height: number; offset: number };

export const useScrollToElement = (
  items: { selected?: boolean }[],
  scrollWrapper: React.RefObject<HTMLDivElement>,
) => {
  const [itemDimentions, setItemDimentions] = useState<ItemDimentions[]>([]);

  const itemsRefs = useRefs<HTMLDivElement>(items.length);

  useEffect(() => {
    const selectedItemIndex = items.findIndex((item) => item.selected);

    scrollWrapper.current?.scrollTo?.({
      top: itemDimentions?.[selectedItemIndex]?.offset || 0,
      behavior: 'smooth',
    });
  });

  useLayoutEffect(() => {
    const itemDimentions = itemsRefs.reduce<ItemDimentions[]>(
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

    setItemDimentions(itemDimentions);
  }, [itemsRefs]);

  return [itemsRefs];
};
