import { Example } from '@consta/stand';
import React from 'react';

import { Card } from '../../../../Card/Card';
import { SnackBar } from '../../../SnackBar';

const items = [
  {
    key: '1',
    message: 'Это пример сообщения в контейнере шириной 300 px',
    status: 'normal',
  },
];

export const SnackBarExampleAdaptive = () => {
  return (
    <Example col={1}>
      <Card verticalSpace="xs" style={{ maxWidth: 300 }}>
        <SnackBar items={items} />
      </Card>
    </Example>
  );
};
