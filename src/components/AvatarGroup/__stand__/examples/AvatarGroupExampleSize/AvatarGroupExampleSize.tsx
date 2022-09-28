import './AvatarGroupExampleSize.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { avatarGroupItems } from '../../../__mocks__/mock.data';
import { AvatarGroup } from '../../../AvatarGroup';

const cnAvatarGroupExampleSize = cn('AvatarGroupExampleSize');

export const AvatarGroupExampleSize = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [
      wp.decorator({ distribute: 'left' }),
      cnAvatarGroupExampleSize(),
    ])}
  >
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
