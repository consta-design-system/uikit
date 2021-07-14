import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Checkbox } from '../../../Checkbox';

const emptyFunction = action('emptyFunction');

export const CheckboxExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Checkbox onChange={emptyFunction} size="m" label="Размер m" checked={false} />
    <Checkbox onChange={emptyFunction} size="l" label="Размер l" checked={false} />
  </StoryBookExample>
);
