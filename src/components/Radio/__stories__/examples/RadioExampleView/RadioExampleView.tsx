import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Radio } from '../../../Radio';

const emptyFunction = action('emptyFunction');

export const RadioExampleView = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
  >
    <Radio view="primary" checked label="Акцентная радиокнопка" onChange={emptyFunction} />
    <Radio view="ghost" checked label="Второстепенная радиокнопка" onChange={emptyFunction} />
  </StoryBookExample>
);
