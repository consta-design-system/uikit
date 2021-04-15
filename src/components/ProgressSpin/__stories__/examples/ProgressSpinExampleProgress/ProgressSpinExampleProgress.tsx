import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ProgressSpin } from '../../../ProgressSpin';

export const ProgressSpinExampleProgress = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <ProgressSpin size="m" />
    <ProgressSpin progress={20} size="m" />
    <ProgressSpin progress={40} size="m" />
    <ProgressSpin progress={60} size="m" />
    <ProgressSpin progress={80} size="m" />
  </StoryBookExample>
);
