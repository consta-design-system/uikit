import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Avatar } from '../../../Avatar';

export const AvatarExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
    <Avatar size="xs" name="Геннадий Куст" className={wp.decorator({ 'indent-r': 'm' })} />
    <Avatar size="s" name="Геннадий Куст" className={wp.decorator({ 'indent-r': 'm' })} />
    <Avatar size="m" name="Геннадий Куст" className={wp.decorator({ 'indent-r': 'm' })} />
  </StoryBookExample>
);
