import { Example } from '@consta/stand';
import React from 'react';

import url from '../../../__mocks__/avatar_1.jpg';
import { User } from '../../../User';

export const UserExampleName = () => (
  <Example>
    <User avatarUrl={url} name="Гюзель Скважина" info="В отпуске" />
    <User avatarUrl={url} name="Люций" info="Эксперт" />
  </Example>
);
