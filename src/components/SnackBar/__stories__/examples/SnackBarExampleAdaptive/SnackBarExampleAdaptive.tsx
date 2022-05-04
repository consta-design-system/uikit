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
    <Card verticalSpace="xs" style={{ maxWidth: 300 }}>
      <SnackBar items={items} />
    </Card>
  );
};
