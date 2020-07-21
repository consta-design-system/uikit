import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { File } from '../../../File';

export const ExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <File size="m" />
    <File size="s" />
  </StoryBookExample>
);
