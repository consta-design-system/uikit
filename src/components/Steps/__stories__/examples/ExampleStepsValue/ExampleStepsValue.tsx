import React from 'react';
import { action } from '@storybook/addon-actions';

import { simpleItems as items } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Steps } from '../../../Steps';

const emptyFunction = action('emptyFunction');

export const ExampleStepsValue = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Steps items={items} value={items[1]} getLabel={(item) => item} onChange={emptyFunction} />
  </StoryBookExample>
);
