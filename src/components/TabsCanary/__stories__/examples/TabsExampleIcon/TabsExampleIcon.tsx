import React, { useState } from 'react';

import { IconComponent } from '../../../../../icons/Icon/Icon';
import { IconCamera } from '../../../../../icons/IconCamera/IconCamera';
import { IconPhoto } from '../../../../../icons/IconPhoto/IconPhoto';
import { IconRing } from '../../../../../icons/IconRing/IconRing';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tabs } from '../../../TabsCanary';

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
