import { Example } from '@consta/stand';
import React from 'react';

import { User } from '../../../User';

export const UserExampleStatus = () => (
  <Example>
    <User name="Камилла Флюдиндер" info="Онлайн" status="available" />
    <User name="Камилла Флюдиндер" info="Из дома" status="remote" />
    <User name="Камилла Флюдиндер" info="Недоступна" status="out" />
  </Example>
);
