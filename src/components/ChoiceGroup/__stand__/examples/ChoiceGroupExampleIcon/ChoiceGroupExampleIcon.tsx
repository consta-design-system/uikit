import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { IconComponent } from '##/icons/Icon';
import { IconCamera } from '##/icons/IconCamera';
import { IconPhoto } from '##/icons/IconPhoto';
import { IconRing } from '##/icons/IconRing';

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
