import React from 'react';

import { avatarGroupItems } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { AvatarGroup } from '../../../AvatarGroup';

export const AvatarGroupExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
    <div className={wp.decorator({ 'indent-r': 'm' })}>
      <AvatarGroup size="xs" items={avatarGroupItems} />
    </div>
    <div className={wp.decorator({ 'indent-r': 'm' })}>
      <AvatarGroup size="s" items={avatarGroupItems} />
    </div>
    <div className={wp.decorator({ 'indent-r': 'm' })}>
      <AvatarGroup size="m" items={avatarGroupItems} />
    </div>
    <div className={wp.decorator({ 'indent-r': 'm' })}>
      <AvatarGroup size="l" items={avatarGroupItems} />
    </div>
  </StoryBookExample>
);
