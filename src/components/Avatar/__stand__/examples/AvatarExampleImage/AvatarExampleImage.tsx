import { Example } from '@consta/stand';
import React from 'react';

import { Avatar } from '../../../Avatar';
import avatar from '../images/avatar.png';

export const AvatarExampleImage = () => (
  <Example>
    <Avatar url={avatar} name="Геннадий Куст" />
    <Avatar name="Геннадий Куст" />
    <Avatar name="Куст Геннадий Альбертович" />
    <Avatar />
  </Example>
);
