import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../Text/Text';
import { Card } from '../../../Card';

export const CardExampleState = () => {
  return (
    <Example>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="alert">
        <Text view="primary" size="m" lineHeight="m">
          Опасная карточка
        </Text>
      </Card>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="warning">
        <Text view="primary" size="m" lineHeight="m">
          Тревожная карточка
        </Text>
      </Card>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="success">
        <Text view="primary" size="m" lineHeight="m">
          Успешная карточка
        </Text>
      </Card>
    </Example>
  );
};
