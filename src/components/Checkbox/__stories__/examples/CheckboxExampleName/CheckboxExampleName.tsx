import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Checkbox } from '../../../Checkbox';

const emptyFunction = action('emptyFunction');

export const CheckboxExampleName = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Checkbox onChange={emptyFunction} label="Это чекбокс" checked={false} />
  </StoryBookExample>
);
