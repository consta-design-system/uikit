import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { BookmarkTabs } from '##/components/BookmarkTabs';
import {
  BookmarkTabsItemDefault,
  BookmarkTabsPropForm,
} from '##/components/BookmarkTabs/types';

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

const forms: BookmarkTabsPropForm[] = ['brick', 'round'];

export const BookmarkTabsExampleForm = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example
      items={forms}
      getItemLabel={(form) => `form="${form}"`}
      getItemNode={(form) => (
        <BookmarkTabs
          style={{
            width: 600,
          }}
          form={form}
          items={items}
          value={value}
          onChange={setValue}
        />
      )}
    />
  );
};
