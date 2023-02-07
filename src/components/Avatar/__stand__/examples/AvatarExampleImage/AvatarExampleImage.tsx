import { Example } from '@consta/stand';
import React from 'react';

import avatar from '../../../__mocks__/image.jpeg';
import { Avatar } from '../../../Avatar';

export const AvatarExampleImage = () => (
  <Example>
    <Avatar url={avatar} name="Вадим Матвеев" />
    <Avatar name="Вадим Матвеев" />
    <Avatar name="Куст Геннадий Альбертович" />
    <Avatar />
  </Example>
);
