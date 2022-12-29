import { IconComponent } from '@consta/icons/Icon';
import { IconCamera } from '@consta/icons/IconCamera';
import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconRing } from '@consta/icons/IconRing';
import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tabs } from '../../../Tabs';

type Item = {
  name: string;
  image?: IconComponent;
};

const items: Item[] = [
  {
    name: 'Первый',
    image: IconPhoto,
  },
  {
    name: 'Второй',
    image: IconRing,
  },
  {
    name: 'Третий вариант',
    image: IconCamera,
  },
];

export const TabsExampleIcon = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.image}
      />
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.image}
        onlyIcon
      />
    </StoryBookExample>
  );
};
