import './ChoiceGroupExampleAdaptiveScroll.css';

import React, { useCallback, useState } from 'react';

import { useBreakpoints } from '../../../../../hooks/useBreakpoints/useBreakpoints';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { RadioGroup } from '../../../../RadioGroup/RadioGroup';
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

const cnChoiceGroupExampleAdaptiveScroll = cn('ChoiceGroupExampleAdaptiveScroll');

const getLabel = (item: string) => item;

export const ChoiceGroupExampleAdaptiveScroll = () => {
  return (
    <StoryBookExample>
      <div className={cnChoiceGroupExampleAdaptiveScroll()}>
        <ChoiceGroup
          name="ChoiceGroupExampleAdaptiveScroll"
          items={items}
          getLabel={getLabel}
          form="round"
        />
      </div>
    </StoryBookExample>
  );
};

const items2: string[] = ['один', 'два', 'три', 'четыре', 'пять'];

export const ChoiceGroupExampleAdaptiveUseBreakpoints = () => {
  const { desktop } = useBreakpoints({ desktop: 800 });
  const [value, setValue] = useState(items2[0]);
  const onChandge = useCallback(({ value }: { value: string }) => setValue(value), []);

  if (desktop) {
    return (
      <StoryBookExample>
        <ChoiceGroup
          name="ChoiceGroupExampleAdaptiveUseBreakpoints"
          items={items2}
          getLabel={getLabel}
          form="round"
          value={value}
          onChange={onChandge}
        />
      </StoryBookExample>
    );
  }

  return (
    <StoryBookExample>
      <RadioGroup
        name="ChoiceGroupExampleAdaptiveUseBreakpoints"
        items={items2}
        getLabel={getLabel}
        value={value}
        onChange={onChandge}
      />
    </StoryBookExample>
  );
};
