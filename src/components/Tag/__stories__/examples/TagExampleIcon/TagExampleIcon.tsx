import React from 'react';

import { IconMoon } from '../../../../../icons/IconMoon/IconMoon';
import { IconSun } from '../../../../../icons/IconSun/IconSun';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

export const TagExampleIcon = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag mode="button" icon={IconMoon} label="Луна" />
    <Tag mode="buttin" icon={IconSun} label="Солнце" />
  </StoryBookExample>
);
