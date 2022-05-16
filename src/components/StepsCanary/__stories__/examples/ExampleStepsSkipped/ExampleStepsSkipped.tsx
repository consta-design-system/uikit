import React from 'react';
import { action } from '@storybook/addon-actions';

import { items } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Steps } from '../../../StepsCanary';

const emptyFunction = action('emptyFunction');

export const ExampleStepsSkipped = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Steps
      items={items}
      getItemSkipped={(item) => item.skip}
      value={items[1]}
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
