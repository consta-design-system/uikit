import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { File } from '../../../File';

export const FileExampleLoading = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <File loading />
    <File loading loadingWithProgressSpin />
    <File loading loadingWithProgressSpin loadingProgress={30} />
    <File loading loadingWithProgressSpin loadingProgress={60} />
    <File loading loadingWithProgressSpin loadingProgress={90} />
  </StoryBookExample>
);
