import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Switch } from '../../../Switch';

export const SwitchExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Switch label="Switch" />
    <Switch label="Checked" checked />
    <Switch label="Disabled" disabled />
  </StoryBookExample>
);
