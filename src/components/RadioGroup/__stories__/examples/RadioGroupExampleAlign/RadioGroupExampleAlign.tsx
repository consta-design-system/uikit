import React from 'react';

import { alignItems, simpleItems } from '../../../__mocks__/data.mock';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { RadioGroup } from '../../../RadioGroup';

export function RadioGroupExampleAlign() {
  const [value, setValue] = React.useState<string | null>(alignItems[0]);

  return (
    <StoryBookExample
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <RadioGroup
        value={value}
        items={alignItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        align="top"
      />
      <RadioGroup
        value={value}
        items={alignItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        align="center"
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
