import { Example } from '@consta/stand';
import React from 'react';

import avatar from '../../../__mocks__/image.jpeg';
import { Avatar } from '../../../Avatar';

export const AvatarExampleMonochrome = () => (
  <Example>
    <Avatar name="Вадим Матвеев" monochrome />
    <Avatar url={avatar} name="Вадим Матвеев" monochrome />
  </Example>
);
