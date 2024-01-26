import { Example } from '@consta/stand';
import React from 'react';

import url from '../../../__mocks__/avatar_1.jpg';
import { Avatar } from '../../../Avatar';

export const AvatarExampleMonochrome = () => (
  <Example>
    <Avatar name="Вадим Матвеев" monochrome />
    <Avatar url={url} name="Вадим Матвеев" monochrome />
  </Example>
);
