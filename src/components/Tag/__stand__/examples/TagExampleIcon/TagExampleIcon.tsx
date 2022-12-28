import { IconMoon } from '@consta/icons/IconMoon';
import { IconSun } from '@consta/icons/IconSun';
import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

export const TagExampleIcon = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag onClick={() => {}} icon={IconMoon} label="Луна" />
    <Tag onClick={() => {}} icon={IconSun} label="Солнце" />
  </StoryBookExample>
);
