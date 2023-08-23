import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { BookmarkTabs } from '##/components/BookmarkTabsCanary/BookmarkTabs';
import { BookmarkTabsItemDefault } from '##/components/BookmarkTabsCanary/types';

const array: BookmarkTabsItemDefault[] = [
  {
    key: 1,
    label: 'Вкладка 1',
  },
  {
    key: 2,
    label: 'Вкладка 2',
  },
  {
    key: 3,
    label: 'Вкладка 3',
  },
];

export const BookmarkTabsExampleOnRemove = () => {
  const [items, setItems] = useState<BookmarkTabsItemDefault[]>(array);
  const [value, setValue] = useState(array[0]);

  const onRemove = (item: BookmarkTabsItemDefault) => {
    setItems(items.filter((el) => el.key !== item.key));
  };

  const onCreate = () => {
    setItems([
      ...items,
      {
        key: items.length + 1,
        label: `Вкладка ${items.length + 1}`,
      },
    ]);
  };

  return (
    <Example>
      <BookmarkTabs
        style={{
          width: 600,
        }}
        items={items}
        onRemove={onRemove}
        value={value}
        onChange={setValue}
        onCreate={onCreate}
      />
    </Example>
  );
};
