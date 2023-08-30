import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { BookmarkTabs } from '##/components/BookmarkTabsCanary/BookmarkTabs';
import {
  BookmarkTabsItemDefault,
  BookmarkTabsPropView,
} from '##/components/BookmarkTabsCanary/types';

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

const views: BookmarkTabsPropView[] = ['ghost', 'clear'];

export const BookmarkTabsExampleView = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example
      items={views}
      getItemLabel={(view) => `view="${view}"`}
      getItemNode={(view) => (
        <BookmarkTabs
          style={{
            width: 600,
          }}
          view={view}
          items={items}
          value={value}
          onChange={setValue}
        />
      )}
    />
  );
};
