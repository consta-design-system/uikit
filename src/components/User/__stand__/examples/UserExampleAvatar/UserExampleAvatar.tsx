import { Example } from '@consta/stand';
import React from 'react';

import url from '../../../__mocks__/avatar_1.jpg';
import { User } from '../../../User';

export const UserExampleAvatar = () => (
  <Example>
    <User avatarUrl={url} name="Роберт Пласт" info="Сейсмик" />
    <User avatarUrl={url} name="Роберт Пласт" info="Сейсмик" onlyAvatar />
  </Example>
);

export const UserExampleAvatarName = () => (
  <Example>
    <User name="Роберт Пласт" info="Сейсмик" />
    <User name="Роберт Альбертович Пласт" info="Сейсмик" onlyAvatar />
  </Example>
);
