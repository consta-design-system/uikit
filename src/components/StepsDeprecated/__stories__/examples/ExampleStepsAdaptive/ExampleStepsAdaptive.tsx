import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { simpleItems as items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../StepsDeprecated';

export const ExampleStepsAdaptive = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section')}
    style={{ maxWidth: 200 }}
  >
    <Steps
      items={items}
      value={items[1]}
      getLabel={(item) => item}
      onChange={() => {}}
    />
  </StoryBookExample>
);
