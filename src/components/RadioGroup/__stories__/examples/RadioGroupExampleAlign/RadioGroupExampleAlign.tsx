import React from 'react';

import { simpleItems } from '../../../__mocks__/data.mock';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { RadioGroup } from '../../../RadioGroup';

export function RadioGroupExampleAlign() {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <RadioGroup
        value={value}
        items={simpleItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
}

export function RadioGroupExampleColumn() {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <RadioGroup
        value={value}
        items={simpleItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        direction="column"
      />
    </StoryBookExample>
  );
}

export function RadioGroupExampleRow() {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <RadioGroup
        value={value}
        items={simpleItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        direction="row"
      />
    </StoryBookExample>
  );
}
