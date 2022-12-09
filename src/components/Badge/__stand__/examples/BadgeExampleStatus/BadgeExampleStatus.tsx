import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '../../../Badge';

export const BadgeExampleStatus = () => (
  <Example>
    <Badge status="system" label="Черновик" />
    <Badge status="normal" label="Новый" />
    <Badge status="warning" label="На проверке" />
    <Badge status="error" label="Есть ошибки" />
    <Badge status="success" label="Готов" />
  </Example>
);
