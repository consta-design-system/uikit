import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ProgressLine } from '../../../ProgressLine';

export const ProgressLineExampleMode = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div>
        <ProgressLine />
      </div>
      <div>
        <ProgressLine value={30} />
      </div>
    </StoryBookExample>
  );
};
