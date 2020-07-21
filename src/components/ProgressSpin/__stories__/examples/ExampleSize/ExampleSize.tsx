import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ProgressSpin } from '../../../ProgressSpin';

export const ExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <ProgressSpin progress={70} size="m" />
    <ProgressSpin progress={70} size="s" />
  </StoryBookExample>
);
