import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Item, items, simpleItems } from '../../../__mocks__/data.mock';
import { RadioGroup } from '../../../RadioGroup';

export const RadioGroupExampleDisabled = () => {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <RadioGroup
        value={value}
        items={simpleItems}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        disabled
      />
    </StoryBookExample>
  );
};

export const RadioGroupExampleDisabledItem = () => {
  const [value, setValue] = React.useState<Item | null>(items[0]);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <RadioGroup
        value={value}
        items={items}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};
