import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

export const TagExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag onClick={() => {}} size="xs" label="Размер XS" />
    <Tag onClick={() => {}} size="s" label="Размер S" />
    <Tag onClick={() => {}} size="m" label="Размер M" />
    <Tag onClick={() => {}} size="l" label="Размер L" />
  </StoryBookExample>
);
