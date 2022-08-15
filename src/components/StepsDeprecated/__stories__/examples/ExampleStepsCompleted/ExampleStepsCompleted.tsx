import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../StepsDeprecated';

export const ExampleStepsCompleted = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Steps
      items={items}
      getLabel={(item) => item.label}
      getCompleted={(item) => item.completed || false}
      value={items[1]}
      onChange={() => {}}
    />
  </StoryBookExample>
);
