import React from 'react';

import { Card } from '../../../../Card/Card';
import { SnackBar } from '../../../SnackBar';

const items = [
  {
    key: '1',
    message: 'Это пример сообщения в контейнере шириной 450 px',
    status: 'normal',
  },
];

export const SnackBarExampleAdaptive = () => {
  return (
    <Card verticalSpace="l" horizontalSpace="l" style={{ maxWidth: 450 }}>
      <SnackBar items={items} />
    </Card>
  );
};
