import { Example } from '@consta/stand';
import React from 'react';

import { Avatar } from '../../../Avatar';

export const AvatarExampleForm = () => (
  <Example>
    <Avatar form="round" name="Геннадий Куст" />
    <Avatar form="default" name="Геннадий Куст" />
    <Avatar form="brick" name="Геннадий Куст" />
  </Example>
);
