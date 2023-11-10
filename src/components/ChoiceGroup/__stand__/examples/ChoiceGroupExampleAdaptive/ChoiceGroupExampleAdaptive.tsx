import './ChoiceGroupExampleAdaptiveScroll.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { useBreakpoints } from '##/hooks/useBreakpoints';
import { cn } from '##/utils/bem';

import { ChoiceGroup } from '../../../ChoiceGroup';

const items: string[] = [
  'один',
  'два',
  'три',
  'четыре',
  'пять',
  'шесть',
  'семь',
  'восемь',
  'девять',
];

const cnChoiceGroupExampleAdaptiveScroll = cn(
  'ChoiceGroupExampleAdaptiveScroll',
);

const getItemLabel = (item: string) => item;

export const ChoiceGroupExampleAdaptiveScroll = () => {
  return (
    <Example>
      <div className={cnChoiceGroupExampleAdaptiveScroll()}>
        <ChoiceGroup
          name="ChoiceGroupExampleAdaptiveScroll"
          items={items}
          getItemLabel={getItemLabel}
          form="round"
        />
      </div>
    </Example>
  );
};

const items2: string[] = ['один', 'два', 'три', 'четыре', 'пять'];

export const ChoiceGroupExampleAdaptiveUseBreakpoints = () => {
  const { desktop } = useBreakpoints({ map: { desktop: 800 }, isActive: true });
  const [value, setValue] = useState(items2[0]);

  if (desktop) {
    return (
      <Example>
        <ChoiceGroup
          name="ChoiceGroupExampleAdaptiveUseBreakpoints"
          items={items2}
          className={cnChoiceGroupExampleAdaptiveScroll('Component')}
          getItemLabel={getItemLabel}
          form="round"
          value={value}
          onChange={setValue}
        />
      </Example>
    );
  }

  return (
    <Example>
      <ChoiceGroup
        name="ChoiceGroupExampleAdaptiveUseBreakpoints"
        items={items2}
        getItemLabel={getItemLabel}
        value={value}
        className={cnChoiceGroupExampleAdaptiveScroll('Component')}
        onChange={setValue}
      />
    </Example>
  );
};
