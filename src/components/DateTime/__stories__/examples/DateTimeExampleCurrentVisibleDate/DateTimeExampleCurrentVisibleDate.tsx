import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DateTime } from '../../../DateTime';

export const DateTimeExampleCurrentVisibleDate = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime currentVisibleDate={new Date(2000, 1, 1)} />
    </StoryBookExample>
  );
};
