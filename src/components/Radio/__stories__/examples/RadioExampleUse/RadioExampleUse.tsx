import { action } from '@storybook/addon-actions';
import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Radio } from '../../../Radio';

const emptyFunction = () => action('emptyFunction');

export const RadioExampleOne = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Radio label="Это радиокнопка" onChange={emptyFunction} checked />
    </StoryBookExample>
  );
};
