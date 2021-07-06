import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Radio } from '../../../Radio';

const emptyFunction = () => action('emptyFunction');

export function RadioExampleOne() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Radio label="Это радиокнопка" onChange={emptyFunction} checked />
    </StoryBookExample>
  );
}
