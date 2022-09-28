import './AvatarGroupExampleForm.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { avatarGroupItems } from '../../../__mocks__/mock.data';
import { AvatarGroup } from '../../../AvatarGroup';

const cnAvatarGroupExampleForm = cn('AvatarGroupExampleForm');

export const AvatarGroupExampleForm = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [
      wp.decorator({ distribute: 'left' }),
      cnAvatarGroupExampleForm(),
    ])}
  >
    <div className={wp.decorator({ 'indent-r': 'm' })}>
      <AvatarGroup form="round" items={avatarGroupItems} />
    </div>
    <div className={wp.decorator({ 'indent-r': 'm' })}>
      <AvatarGroup form="default" items={avatarGroupItems} />
    </div>
    <div className={wp.decorator({ 'indent-r': 'm' })}>
      <AvatarGroup form="brick" items={avatarGroupItems} />
    </div>
  </StoryBookExample>
);
