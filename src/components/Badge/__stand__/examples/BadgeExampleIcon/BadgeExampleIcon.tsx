import { IconCheck } from '@consta/icons/IconCheck';
import { IconClose } from '@consta/icons/IconClose';
import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '../../../Badge';

export const BadgeExampleIcon = () => (
  <Example>
    <Badge icon={IconCheck} status="success" label="Съедобно" />
    <Badge icon={IconClose} status="error" label="Отрава" />
  </Example>
);
