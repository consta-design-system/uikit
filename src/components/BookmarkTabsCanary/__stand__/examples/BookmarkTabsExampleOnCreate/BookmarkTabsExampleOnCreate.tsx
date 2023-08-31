import { Example } from '@consta/stand';
import React, { useState } from 'react';

import {
  BookmarkTabs,
  BookmarkTabsItemDefault,
} from '##/components/BookmarkTabsCanary';

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

export const BookmarkTabsExampleOnCreate = () => {
  const [items, setItems] = useState<BookmarkTabsItemDefault[]>(array);
  const [value, setValue] = useState(array[0]);

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
        value={value}
        onChange={setValue}
        onCreate={onCreate}
      />
    </Example>
  );
};
