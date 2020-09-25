import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Avatar } from '../../../Avatar';

export const AvatarExampleForm = () => (
  <StoryBookExample className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
    <Avatar form="round" name="Геннадий Куст" className={wp.decorator({ 'indent-r': 'm' })} />
    <Avatar form="default" name="Геннадий Куст" className={wp.decorator({ 'indent-r': 'm' })} />
    <Avatar form="brick" name="Геннадий Куст" className={wp.decorator({ 'indent-r': 'm' })} />
  </StoryBookExample>
);
