import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ProgressSpin } from '../../../ProgressSpin';

export const ProgressSpinExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <ProgressSpin value={70} size="2xl" />
    <ProgressSpin value={70} size="xl" />
    <ProgressSpin value={70} size="l" />
    <ProgressSpin value={70} size="m" />
    <ProgressSpin value={70} size="s" />
  </StoryBookExample>
);
