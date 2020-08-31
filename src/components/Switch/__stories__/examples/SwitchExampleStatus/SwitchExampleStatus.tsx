import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Switch } from '../../../Switch';

const emptyFunction = action('emptyFunction');

export const SwitchExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Switch label="Switch" checked={false} onChange={emptyFunction} />
    <Switch label="Checked" checked onChange={emptyFunction} />
    <Switch label="Disabled" disabled checked={false} onChange={emptyFunction} />
  </StoryBookExample>
);
