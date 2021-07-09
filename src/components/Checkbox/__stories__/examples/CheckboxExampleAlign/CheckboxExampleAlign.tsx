import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Checkbox } from '../../../Checkbox';

const emptyFunction = action('emptyFunction');

export const CheckboxExampleAlign = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
  >
    <Checkbox
      align="center"
      checked
      label="Длинный текст для чекбокса с выравниванием по центру, здесь несколько строк"
      onChange={emptyFunction}
    />
    <Checkbox
      align="top"
      checked
      label="Длинный текст для чекбокса с выравниванием по верху, здесь несколько строк"
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
