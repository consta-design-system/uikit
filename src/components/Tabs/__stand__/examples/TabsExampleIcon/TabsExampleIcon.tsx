import { IconComponent } from '@consta/icons/Icon';
import { IconCamera } from '@consta/icons/IconCamera';
import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconRing } from '@consta/icons/IconRing';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs } from '../../../Tabs';

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

export const TabsExampleIcon = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLeftIcon={getItemIcon}
      />
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemRightIcon={getItemIcon}
      />
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLeftIcon={getItemIcon}
        onlyIcon
      />
    </Example>
  );
};
