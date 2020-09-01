import React from 'react';
import { action } from '@storybook/addon-actions';

import { IconMoon } from '../../../../../icons/IconMoon/IconMoon';
import { IconSun } from '../../../../../icons/IconSun/IconSun';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

const emptyFunction = action('emptyFunction');

export const TagExampleIcon = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag onClick={emptyFunction} icon={IconMoon} label="Луна" />
    <Tag onClick={emptyFunction} icon={IconSun} label="Солнце" />
  </StoryBookExample>
);
