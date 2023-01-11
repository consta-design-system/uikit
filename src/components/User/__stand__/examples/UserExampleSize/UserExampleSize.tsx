import { Example } from '@consta/stand';
import React from 'react';

import { User } from '../../../User';

export const UserExampleSize = () => (
  <Example>
    <User name="Серж Послоян" info="Размер S" view="ghost" size="s" />
    <User name="Серж Послоян" info="Размер M" view="ghost" size="m" />
    <User name="Серж Послоян" info="Размер L" view="ghost" size="l" />
  </Example>
);

export const UserExampleSizeWidth = () => (
  <Example>
    <User name="Серж Послоян" info="В ширину блока" view="ghost" width="full" />
  </Example>
);
