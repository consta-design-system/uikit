import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Checkbox } from '../../../Checkbox';

const emptyFunction = action('emptyFunction');

export const CheckboxExampleView = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
  >
    <Checkbox view="primary" checked label="Акцентный чекбокс" onChange={emptyFunction} />
    <Checkbox view="ghost" checked label="Второстепенный чекбокс" onChange={emptyFunction} />
  </StoryBookExample>
);
