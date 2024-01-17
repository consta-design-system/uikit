import { Example } from '@consta/stand';
import React from 'react';

import url from '../../../__mocks__/avatar_1.jpg';
import { Avatar } from '../../../Avatar';

export const AvatarExampleImage = () => (
  <Example>
    <Avatar url={url} name="Вадим Матвеев" />
    <Avatar name="Вадим Матвеев" />
    <Avatar name="Куст Геннадий Альбертович" />
    <Avatar />
  </Example>
);
