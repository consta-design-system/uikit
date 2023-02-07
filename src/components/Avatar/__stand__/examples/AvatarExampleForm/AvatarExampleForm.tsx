import { Example } from '@consta/stand';
import React from 'react';

import { Avatar } from '../../../Avatar';

export const AvatarExampleForm = () => (
  <Example>
    <Avatar form="round" name="Вадим Матвеев" />
    <Avatar form="default" name="Вадим Матвеев" />
    <Avatar form="brick" name="Вадим Матвеев" />
  </Example>
);
