import { Example } from '@consta/stand';
import React from 'react';

import { IconCheck } from '##/icons/IconCheck/IconCheck';
import { IconClose } from '##/icons/IconClose/IconClose';

import { Badge } from '../../../Badge';

export const BadgeExampleIcon = () => (
  <Example>
    <Badge icon={IconCheck} status="success" label="Съедобно" />
    <Badge icon={IconClose} status="error" label="Отрава" />
  </Example>
);
