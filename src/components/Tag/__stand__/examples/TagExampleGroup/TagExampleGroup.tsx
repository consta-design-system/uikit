import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

export const TagExampleGroup = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag onClick={() => {}} label="Марс" group="1" />
    <Tag onClick={() => {}} label="земля" group="2" />
    <Tag onClick={() => {}} label="Земля" group="1" />
    <Tag onClick={() => {}} label="Венера" group="1" />
    <Tag onClick={() => {}} label="вода" group="2" />
    <Tag onClick={() => {}} label="огонь" group="2" />
    <Tag onClick={() => {}} label="Нептун" group="1" />
    <Tag onClick={() => {}} label="Церера" group="1" />
  </StoryBookExample>
);
