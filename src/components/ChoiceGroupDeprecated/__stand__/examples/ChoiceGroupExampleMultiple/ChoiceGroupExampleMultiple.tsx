import './ChoiceGroupExampleMultiple.css';

import React, { useState } from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ChoiceGroup } from '../../../ChoiceGroupDeprecated';

const items: string[] = ['один', 'два', 'три', 'четыре', 'пять', 'шесть'];

const cnChoiceGroupExampleMultiple = cn('ChoiceGroupExampleMultiple');

export const ChoiceGroupExampleOne = () => {
  const [value, setValue] = useState<string | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p>Выберите один вариант</p>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        name="ChoiceGroupExampleOne"
        className={cnChoiceGroupExampleMultiple()}
      />
    </StoryBookExample>
  );
};

export const ChoiceGroupExampleMultiple = () => {
  const [value, setValue] = useState<string[] | null>([]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p>Выберите несколько вариантов</p>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        multiple
        name="ChoiceGroupExampleMultiple"
        className={cnChoiceGroupExampleMultiple()}
      />
    </StoryBookExample>
  );
};
