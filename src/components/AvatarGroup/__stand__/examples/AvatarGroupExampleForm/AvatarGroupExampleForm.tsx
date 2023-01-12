import { Example } from '@consta/stand';
import React from 'react';

import { avatarGroupItems } from '../../../__mocks__/mock.data';
import { AvatarGroup } from '../../../AvatarGroup';

export const AvatarGroupExampleForm = () => (
  <Example col={{ 1: 0, 3: 600 }}>
    <AvatarGroup form="round" items={avatarGroupItems} />
    <AvatarGroup form="default" items={avatarGroupItems} />
    <AvatarGroup form="brick" items={avatarGroupItems} />
  </Example>
);
