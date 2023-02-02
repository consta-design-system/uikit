import { Example } from '@consta/stand';
import React from 'react';

import { avatarGroupItems } from '../../../__mocks__/mock.data';
import { AvatarGroup } from '../../../AvatarGroup';

const counts: (number | 'auto')[] = [4, 6, 'auto'];

export const AvatarGroupExampleCount = () => (
  <Example
    col={1}
    items={counts}
    getItemNode={(count) => (
      <AvatarGroup items={avatarGroupItems} visibleCount={count} />
    )}
  />
);
