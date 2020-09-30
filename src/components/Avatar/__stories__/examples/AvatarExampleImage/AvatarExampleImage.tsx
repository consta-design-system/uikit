import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Avatar } from '../../../Avatar';

export const AvatarExampleImage = () => (
  <StoryBookExample className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
    <Avatar
      url="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png"
      name="Геннадий Куст"
      className={wp.decorator({ 'indent-r': 'm' })}
    />
    <Avatar name="Геннадий Куст" className={wp.decorator({ 'indent-r': 'm' })} />
    <Avatar name="Куст Геннадий Альбертович" className={wp.decorator({ 'indent-r': 'm' })} />
    <Avatar />
  </StoryBookExample>
);
