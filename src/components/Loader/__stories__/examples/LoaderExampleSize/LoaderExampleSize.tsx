import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Loader } from '../../../Loader';

export const LoaderExampleSizeM = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Loader size="m" />
  </StoryBookExample>
);

export const LoaderExampleSizeS = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Loader size="s" />
  </StoryBookExample>
);
