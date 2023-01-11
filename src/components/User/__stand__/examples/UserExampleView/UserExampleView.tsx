import { Example } from '@consta/stand';
import React from 'react';

import { User } from '../../../User';

export const UserExampleView = () => (
  <Example>
    <User name="Бон Фишер" info="Старший эксперт" view="ghost" />
  </Example>
);
