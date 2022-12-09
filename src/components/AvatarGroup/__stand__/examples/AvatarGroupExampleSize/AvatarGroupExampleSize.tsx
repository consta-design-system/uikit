import { Example } from '@consta/stand';
import React from 'react';

import { avatarGroupItems } from '../../../__mocks__/mock.data';
import { AvatarGroup } from '../../../AvatarGroup';

export const AvatarGroupExampleSize = () => (
  <Example col={1}>
    <AvatarGroup size="xs" items={avatarGroupItems} />
    <AvatarGroup size="s" items={avatarGroupItems} />
    <AvatarGroup size="m" items={avatarGroupItems} />
    <AvatarGroup size="l" items={avatarGroupItems} />
  </Example>
);
