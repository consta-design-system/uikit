import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

const emptyFunction = action('emptyFunction');

export const TagExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag onClick={emptyFunction} size="xs" label="Размер XS" />
    <Tag onClick={emptyFunction} size="s" label="Размер S" />
    <Tag onClick={emptyFunction} size="m" label="Размер M" />
    <Tag onClick={emptyFunction} size="l" label="Размер L" />
  </StoryBookExample>
);
