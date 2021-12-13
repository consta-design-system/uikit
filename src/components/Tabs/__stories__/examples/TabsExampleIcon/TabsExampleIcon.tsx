import React, { useState } from 'react';

import { Icon } from '../../../../../icons/Icon/Icon';
import { IconCamera } from '../../../../../icons/IconCamera/IconCamera';
import { IconPhoto } from '../../../../../icons/IconPhoto/IconPhoto';
import { IconRing } from '../../../../../icons/IconRing/IconRing';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tabs } from '../../../Tabs';

type Item = {
  name: string;
  icon?: typeof Icon;
};

const items = [
  {
    name: 'Первый',
    icon: IconPhoto,
  },
  {
    name: 'Второй',
    icon: IconRing,
  },
  {
    name: 'Третий вариант',
    icon: IconCamera,
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
        getLabel={(item) => item.name}
        getIcon={(item) => item.icon}
      />
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item.name}
        getIcon={(item) => item.icon}
        onlyIcon
      />
    </StoryBookExample>
  );
};
