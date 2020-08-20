import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

export const TagExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag size="xs" label="Размер XS" />
    <Tag size="s" label="Размер S" />
    <Tag size="m" label="Размер M" />
    <Tag size="l" label="Размер L" />
  </StoryBookExample>
);
