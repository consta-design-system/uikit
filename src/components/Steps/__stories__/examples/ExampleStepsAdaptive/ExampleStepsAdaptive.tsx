import React from 'react';
import { action } from '@storybook/addon-actions';

import { simpleItems as items } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Steps } from '../../../Steps';

const emptyFunction = action('emptyFunction');

export const ExampleStepsAdaptive = () => (
  <StoryBookExample className={cnDocsDecorator('Section')} style={{ maxWidth: 200 }}>
    <Steps items={items} value={items[1]} getLabel={(item) => item} onChange={emptyFunction} />
  </StoryBookExample>
);
