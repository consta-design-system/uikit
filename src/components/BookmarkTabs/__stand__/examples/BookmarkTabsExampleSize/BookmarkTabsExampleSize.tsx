import { Example } from '@consta/stand';
import React, { useState } from 'react';

import {
  BookmarkTabs,
  BookmarkTabsItemDefault,
  BookmarkTabsPropSize,
} from '##/components/BookmarkTabs';

const items: BookmarkTabsItemDefault[] = [
  {
    key: 1,
    label: 'Первая вкладка',
  },
  {
    key: 2,
    label: 'Вторая вкладка',
  },
  {
    key: 3,
    label: 'Третья вкладка',
  },
];

const sizes: BookmarkTabsPropSize[] = ['m', 's'];

export const BookmarkTabsExampleSize = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example
      items={sizes}
      getItemLabel={(size) => `size="${size}"`}
      getItemNode={(size) => (
        <BookmarkTabs
          style={{
            width: 600,
          }}
          size={size}
          items={items}
          value={value}
          onChange={setValue}
        />
      )}
    />
  );
};
