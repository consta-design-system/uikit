import './ChoiceGroupExampleIcon.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconCamera } from '@consta/icons/IconCamera';
import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconRing } from '@consta/icons/IconRing';
import React, { useState } from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
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

const cnChoiceGroupExampleIcon = cn('ChoiceGroupExampleIcon');

export const ChoiceGroupExampleIcon = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        name="ChoiceGroupExampleIcon"
        className={cnChoiceGroupExampleIcon()}
      />
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        onlyIcon
        name="ChoiceGroupExampleIcon"
        className={cnChoiceGroupExampleIcon()}
      />
    </StoryBookExample>
  );
};
