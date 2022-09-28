import './AvatarGroupExampleCount.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { avatarGroupItems } from '../../../__mocks__/mock.data';
import { AvatarGroup } from '../../../AvatarGroup';

const cnAvatarGroupExampleCount = cn('AvatarGroupExampleCount');

export const AvatarGroupExampleCount = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [
      wp.decorator({ distribute: 'left' }),
      cnAvatarGroupExampleCount(),
    ])}
  >
    <div className={wp.decorator({ 'indent-r': 'm' })}>
      <AvatarGroup items={avatarGroupItems} />
    </div>
    <div className={wp.decorator({ 'indent-r': 'm' })}>
      <AvatarGroup items={avatarGroupItems} visibleCount={6} />
    </div>
    <div className={wp.decorator({ 'indent-r': 'm' })}>
      <AvatarGroup items={avatarGroupItems.slice(0, 3)} />
    </div>
  </StoryBookExample>
);
