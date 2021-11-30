import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ChoiceGroup } from '../../../ChoiceGroup';

type Item = { name: string; disabled?: boolean };

const items: Item[] = [
  { name: 'один' },
  { name: 'два' },
  { name: 'три', disabled: true },
  { name: 'четыре', disabled: true },
];

export const ChoiceGroupExampleSomeDisabled = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item.name}
        name="ChoiceGroupExampleSomeDisabled"
        getDisabled={(item: Item) => item.disabled}
      />
    </StoryBookExample>
  );
};
