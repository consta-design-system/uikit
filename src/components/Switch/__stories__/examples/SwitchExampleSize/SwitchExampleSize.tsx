import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Switch } from '../../../Switch';

export const SwitchExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Switch size="s" label="Размер S" checked />
    <Switch size="m" label="Размер М" />
    <Switch size="l" label="Размер L" />
  </StoryBookExample>
);
