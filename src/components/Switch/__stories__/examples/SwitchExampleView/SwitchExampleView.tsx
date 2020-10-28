import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Switch } from '../../../Switch';

const emptyFunction = action('emptyFunction');

export const SwitchExampleView = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
  >
    <Switch view="primary" checked label="Акцентный переключатель" onChange={emptyFunction} />
    <Switch view="ghost" checked label="Второстепенный переключатель" onChange={emptyFunction} />
  </StoryBookExample>
);
