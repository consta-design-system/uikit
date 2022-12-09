import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { IconComponent } from '##/icons/Icon/Icon';
import { IconCamera } from '##/icons/IconCamera/IconCamera';
import { IconPhoto } from '##/icons/IconPhoto/IconPhoto';
import { IconRing } from '##/icons/IconRing/IconRing';
import { cn } from '##/utils/bem';

import { ChoiceGroup } from '../../../ChoiceGroupDeprecated';

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

const cnChoiceGroupExampleIcon = cn('ChoiceGroupExampleIcon');

export const ChoiceGroupExampleIcon = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item.name}
        getIcon={(item) => item.icon}
        name="ChoiceGroupExampleIcon"
        className={cnChoiceGroupExampleIcon()}
      />
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item.name}
        getIcon={(item) => item.icon}
        onlyIcon
        name="ChoiceGroupExampleIcon"
        className={cnChoiceGroupExampleIcon()}
      />
    </Example>
  );
};
