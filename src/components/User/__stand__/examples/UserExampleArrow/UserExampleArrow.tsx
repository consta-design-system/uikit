import { Example } from '@consta/stand';
import React from 'react';

import { User } from '../../../User';

export const UserExampleArrow = () => (
  <Example>
    <User name="Бон Фишер" info="Старший эксперт" view="ghost" withArrow />
    <User
      name="Бон Фишер"
      info="Старший эксперт"
      view="ghost"
      withArrow
      onlyAvatar
    />
  </Example>
);
