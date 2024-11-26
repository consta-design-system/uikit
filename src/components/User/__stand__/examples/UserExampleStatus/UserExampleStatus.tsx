import { Example } from '@consta/stand';
import React from 'react';

import { User } from '../../../User';

export const UserExampleStatus = () => (
  <Example>
    <User name="Камилла Орлова" info="Онлайн" status="available" />
    <User name="Камилла Орлова" info="Из дома" status="remote" />
    <User name="Камилла Орлова" info="Недоступна" status="out" />
  </Example>
);
