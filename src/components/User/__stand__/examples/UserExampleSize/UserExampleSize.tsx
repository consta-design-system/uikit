import { Example } from '@consta/stand';
import React from 'react';

import { User } from '../../../User';

export const UserExampleSize = () => (
  <Example>
    <User name="Сергей Иванов" info="Размер S" view="ghost" size="s" />
    <User name="Сергей Иванов" info="Размер M" view="ghost" size="m" />
    <User name="Сергей Иванов" info="Размер L" view="ghost" size="l" />
  </Example>
);

export const UserExampleSizeWidth = () => (
  <Example>
    <User
      name="Сергей Иванов"
      info="В ширину блока"
      view="ghost"
      width="full"
    />
  </Example>
);
