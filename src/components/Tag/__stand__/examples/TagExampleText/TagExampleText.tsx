import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

export const TagExampleText = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag onClick={() => {}} label="Рисунок" />
    <Tag onClick={() => {}} label="Портрет" />
    <Tag onClick={() => {}} label="Фото" />
    <Tag onClick={() => {}} label="Полосатый" />
    <Tag onClick={() => {}} label="В клеточку" />
  </StoryBookExample>
);
