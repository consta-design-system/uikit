import { IconComponent } from '@consta/icons/Icon';
import { IconCamera } from '@consta/icons/IconCamera';
import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconRing } from '@consta/icons/IconRing';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroup';

type Item = {
  name: string;
  icon?: IconComponent;
};

const items: Item[] = [
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

export const ChoiceGroupExampleIcon = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        name="ChoiceGroupExampleIcon"
      />
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        onlyIcon
        name="ChoiceGroupExampleIcon"
      />
    </Example>
  );
};
