import React from 'react';

import { Text } from '../../../../Text/Text';
import { Card } from '../../../Card';

export const CardExample = () => {
  return (
    <Card verticalSpace="2xl" horizontalSpace="2xl" state="alert">
      <Text>Здесь может быть ваш текст</Text>
    </Card>
  );
};
