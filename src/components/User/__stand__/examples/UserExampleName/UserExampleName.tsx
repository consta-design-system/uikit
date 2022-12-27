import { Example } from '@consta/stand';
import React from 'react';

import { User } from '../../../User';

export const UserExampleName = () => (
  <Example>
    <User
      avatarUrl="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png"
      name="Гюзель Скважина"
      info="В отпуске"
    />
    <User
      avatarUrl="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png"
      name="Люций"
      info="Эксперт"
    />
  </Example>
);
