import { IconCamera } from '@consta/icons/IconCamera';
import { IconGitHub } from '@consta/icons/IconGitHub';
import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconRing } from '@consta/icons/IconRing';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import {
  BookmarkTabs,
  BookmarkTabsItemDefault,
} from '##/components/BookmarkTabsCanary';

const items: BookmarkTabsItemDefault[] = [
  {
    key: 1,
    label: 'Название 1',
    leftIcon: IconGitHub,
    fixed: true,
  },
  {
    key: 2,
    label: 'Название 2',
    leftIcon: IconCamera,
    fixed: true,
  },
  {
    key: 3,
    label: 'Название 3',
    leftIcon: IconPhoto,
  },
  {
    key: 4,
    label: 'Название 4',
    leftIcon: IconRing,
  },
  {
    key: 5,
    label: 'Название 5',
  },
];

export const BookmarkTabsExampleFixed = () => {
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
