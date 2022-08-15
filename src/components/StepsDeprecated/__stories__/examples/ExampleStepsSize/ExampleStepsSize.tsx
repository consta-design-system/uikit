import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { simpleItems as items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../StepsDeprecated';

const emptyFunction = () => {};

export const ExampleStepsSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Steps
      size="m"
      items={items}
      getLabel={(item) => item}
      value={items[1]}
      onChange={emptyFunction}
    />
    <Steps
      size="l"
      items={items}
      getLabel={(item) => item}
      value={items[1]}
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
