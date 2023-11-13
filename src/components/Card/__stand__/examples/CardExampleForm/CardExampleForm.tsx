import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../Text/Text';
import { Card } from '../../../Card';

export const CardExampleForm = () => {
  return (
    <Example>
      <Card verticalSpace="2xl" horizontalSpace="2xl" form="round">
        <Text view="primary" size="m" lineHeight="m">
          Круглая карточка
        </Text>
      </Card>
      <Card verticalSpace="2xl" horizontalSpace="2xl" form="square">
        <Text view="primary" size="m" lineHeight="m">
          Квадратная карточка
        </Text>
      </Card>
    </Example>
  );
};
