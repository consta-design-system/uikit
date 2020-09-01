import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

const emptyFunction = action('emptyFunction');

export const TagExampleText = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag onClick={emptyFunction} label="Рисунок" />
    <Tag onClick={emptyFunction} label="Портрет" />
    <Tag onClick={emptyFunction} label="Фото" />
    <Tag onClick={emptyFunction} label="Полосатый" />
    <Tag onClick={emptyFunction} label="В клеточку" />
  </StoryBookExample>
);
