import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../Text/Text';
import { Card } from '../../../Card';

export const CardExampleState = () => {
  return (
    <Example>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="alert">
        <Text>Опасная карточка</Text>
      </Card>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="warning">
        <Text>Тревожная карточка</Text>
      </Card>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="success">
        <Text>Успешная карточка</Text>
      </Card>
    </Example>
  );
};
