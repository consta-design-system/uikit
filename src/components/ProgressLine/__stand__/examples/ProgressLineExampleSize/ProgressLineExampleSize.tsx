import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ProgressLine } from '../../../ProgressLine';

export const ProgressLineExampleSize = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div>
        <ProgressLine size="s" />
      </div>
      <div>
        <ProgressLine size="m" />
      </div>
    </StoryBookExample>
  );
};
