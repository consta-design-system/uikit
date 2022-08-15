import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ProgressSpin } from '../../../ProgressSpin';

export const ProgressSpinExampleProgress = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <ProgressSpin size="m" />
    <ProgressSpin value={20} size="m" />
    <ProgressSpin value={40} size="m" />
    <ProgressSpin value={60} size="m" />
    <ProgressSpin value={80} size="m" />
  </StoryBookExample>
);
