import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

export const TagExampleText = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag mode="button" label="Рисунок" />
    <Tag mode="button" label="Портрет" />
    <Tag mode="button" label="Фото" />
    <Tag mode="button" label="Полосатый" />
    <Tag mode="button" label="В клеточку" />
  </StoryBookExample>
);
