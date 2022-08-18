import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { IconBag } from '../../../../IconBag/IconBag';

export const IconExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <IconBag size="xs" />
    <IconBag size="s" />
    <IconBag size="m" />
  </StoryBookExample>
);
