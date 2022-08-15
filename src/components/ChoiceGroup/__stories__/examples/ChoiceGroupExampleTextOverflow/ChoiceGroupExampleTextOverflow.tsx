import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ChoiceGroup } from '../../../ChoiceGroupCanary';

type Item = string;

const items: Item[] = [
  'Экриксинатозавр',
  'Пахицефалозавр',
  'Жираффатитан',
  'Аргентинозавр',
  'Кархародонтозавр',
];

export const ChoiceGroupExampleTextOverflow = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleTextOverflow"
        truncate
      />
    </StoryBookExample>
  );
};
