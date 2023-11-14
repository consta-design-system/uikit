import { Example } from '@consta/stand';
import React, { useMemo, useState } from 'react';

import { PaginationBase } from '##/components/PaginationCanary/PaginationBase';

type Item = {
  key: number;
  page: number;
  label: string;
};

export const PaginationBaseExampleCustom = () => {
  const [value, setValue] = useState<Item>({
    key: 1,
    page: 1,
    label: '1',
  });

  const array: Item[] = useMemo(() => {
    if (value) {
      const arr: Item[] = [
        {
          key: 1,
          page: 1,
          label: '1',
        },
      ];

      const stopPage = value.page >= 5 ? 6 : value.page + 2;

      if (value.page >= 3) {
        arr.push({
          key: 2,
          page: 2,
          label: '...',
        });
      }

      for (let i = Math.min(Math.max(value.page, 2), 5); i <= stopPage; i++) {
        arr.push({
          key: i,
          page: i,
          label: `${i}`,
        });
      }

      if (value.page < 5) {
        arr.push({
          key: 6,
          page: 6,
          label: '...',
        });
      }
      arr.push({
        key: 7,
        page: 7,
        label: '7',
      });
      return arr;
    }
    return [
      ...Array.from({ length: 3 }).map((_el, i) => ({
        key: i + 1,
        page: i + 1,
        label: `${i + 1}`,
      })),
      {
        key: 4,
        page: 4,
        label: '...',
      },
      {
        key: 7,
        page: 7,
        label: '7',
      },
    ];
  }, [value]);

  return (
    <Example>
      <PaginationBase
        items={array}
        value={value}
        onChange={setValue}
        getItemClickable={(item) => item.label !== '...'}
      />
    </Example>
  );
};
