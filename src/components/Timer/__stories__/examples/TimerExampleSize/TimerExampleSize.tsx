import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Timer } from '../../../Timer';

export function TimerExampleSize() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Timer size="m" seconds={5} progress={80} />
      <Timer size="s" seconds={5} progress={80} />
    </StoryBookExample>
  );
}
