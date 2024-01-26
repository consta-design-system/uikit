import { IconComponent } from '@consta/icons/Icon';
import { IconCamera } from '@consta/icons/IconCamera';
import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconRing } from '@consta/icons/IconRing';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { BookmarkTabs } from '##/components/BookmarkTabs';

type Item = {
  label: string;
  image: IconComponent;
};

const items: Item[] = [
  {
    label: 'Первый',
    image: IconPhoto,
  },
  {
    label: 'Второй',
    image: IconRing,
  },
  {
    label: 'Третий вариант',
    image: IconCamera,
  },
];

const getItemIcon = (item: Item) => item.image;

export const BookmarkTabsExampleIcon = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example>
      <BookmarkTabs
        style={{
          width: 600,
        }}
        items={items}
        value={value}
        getItemKey={(item) => item.label}
        getItemLeftIcon={getItemIcon}
        onChange={setValue}
      />
      <BookmarkTabs
        style={{
          width: 600,
        }}
        items={items}
        value={value}
        getItemKey={(item) => item.label}
        getItemRightIcon={getItemIcon}
        onChange={setValue}
      />
    </Example>
  );
};
