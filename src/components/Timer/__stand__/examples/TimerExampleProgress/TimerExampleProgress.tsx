import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Timer } from '../../../Timer';

export function TimerExampleProgress() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Timer size="m" seconds={5} />
      <Timer size="m" seconds={5} progress={20} />
      <Timer size="m" seconds={5} progress={40} />
      <Timer size="m" seconds={5} progress={60} />
      <Timer size="m" seconds={5} progress={80} />
    </StoryBookExample>
  );
}
