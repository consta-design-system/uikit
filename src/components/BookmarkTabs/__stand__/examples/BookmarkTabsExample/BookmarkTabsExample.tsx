import { Example } from '@consta/stand';
import React, { useState } from 'react';

import {
  BookmarkTabs,
  BookmarkTabsItemDefault,
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

export const BookmarkTabsExample = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example>
      <BookmarkTabs
        style={{
          width: 600,
        }}
        items={items}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};
