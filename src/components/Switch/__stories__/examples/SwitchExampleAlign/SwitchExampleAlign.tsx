import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Switch } from '../../../Switch';

const emptyFunction = action('emptyFunction');

export const SwitchExampleAlign = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
  >
    <Switch
      align="center"
      checked
      label="Длинный текст переключателя с выравниванием по центру, записанный в несколько строк"
      onChange={emptyFunction}
    />
    <Switch
      align="top"
      checked
      label="Длинный текст переключателя с выравниванием по верху, записанный в несколько строк"
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
