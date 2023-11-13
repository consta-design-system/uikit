import React from 'react';

import { Text } from '../../../../Text/Text';
import { Card } from '../../../Card';

export const CardExample = () => {
  return (
    <Card verticalSpace="2xl" horizontalSpace="2xl" status="alert">
      <Text view="primary" size="m" lineHeight="m">
        Здесь может быть ваш текст
      </Text>
    </Card>
  );
};

export const CardExampleBasic = () => {
  return (
    <Card verticalSpace="2xl" horizontalSpace="2xl">
      <Text view="primary" size="m" lineHeight="m">
        Это карточка, в которой ничего нет, кроме текста. Здесь может быть что
        угодно.
      </Text>
    </Card>
  );
};
