import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Radio } from '../../../Radio';

const emptyFunction = action('emptyFunction');

export const RadioExampleAlign = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
  >
    <Radio
      align="center"
      checked
      label="Длинный текст для радиокнопки с выравниванием по центру, тут несколько строк"
      onChange={emptyFunction}
    />
    <Radio
      align="top"
      checked
      label="Длинный текст для радиокнопки с выравниванием по верху, тут несколько строк"
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
