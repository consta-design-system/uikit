import { Example } from '@consta/stand';
import React from 'react';

import { avatarGroupItems } from '../../../__mocks__/mock.data';
import { AvatarGroup } from '../../../AvatarGroup';

export const AvatarGroupExampleCount = () => (
  <Example col={1}>
    <AvatarGroup items={avatarGroupItems} />
    <AvatarGroup items={avatarGroupItems} visibleCount={6} />
    <AvatarGroup items={avatarGroupItems.slice(0, 3)} />
  </Example>
);
