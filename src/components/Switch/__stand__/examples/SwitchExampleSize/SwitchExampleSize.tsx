import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Switch } from '../../../Switch';

const emptyFunction = () => {};

export const SwitchExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Switch size="s" label="Размер S" checked onChange={emptyFunction} />
    <Switch
      size="m"
      label="Размер М"
      checked={false}
      onChange={emptyFunction}
    />
    <Switch
      size="l"
      label="Размер L"
      checked={false}
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
