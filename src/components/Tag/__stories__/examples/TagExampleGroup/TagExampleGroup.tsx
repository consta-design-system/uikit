import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

const emptyFunction = action('emptyFunction');

export const TagExampleGroup = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag onClick={emptyFunction} label="Марс" group="1" />
    <Tag onClick={emptyFunction} label="земля" group="2" />
    <Tag onClick={emptyFunction} label="Земля" group="1" />
    <Tag onClick={emptyFunction} label="Венера" group="1" />
    <Tag onClick={emptyFunction} label="вода" group="2" />
    <Tag onClick={emptyFunction} label="огонь" group="2" />
    <Tag onClick={emptyFunction} label="Нептун" group="1" />
    <Tag onClick={emptyFunction} label="Церера" group="1" />
  </StoryBookExample>
);
