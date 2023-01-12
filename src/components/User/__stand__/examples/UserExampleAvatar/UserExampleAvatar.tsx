import { Example } from '@consta/stand';
import React from 'react';

import { User } from '../../../User';

export const UserExampleAvatar = () => (
  <Example>
    <User
      avatarUrl="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png"
      name="Роберт Пласт"
      info="Cейсмик"
    />
    <User
      avatarUrl="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png"
      name="Роберт Пласт"
      info="Cейсмик"
      onlyAvatar
    />
  </Example>
);

export const UserExampleAvatarName = () => (
  <Example>
    <User name="Роберт Пласт" info="Cейсмик" />
    <User name="Роберт Альбертович Пласт" info="Cейсмик" onlyAvatar />
  </Example>
);
