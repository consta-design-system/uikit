import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ProgressLine } from '../../../ProgressLine';

export const ProgressLineExampleMode = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div>
        <ProgressLine mode="indeterminate" />
      </div>
      <div>
        <ProgressLine mode="determinate" progress={30} />
      </div>
    </StoryBookExample>
  );
};
