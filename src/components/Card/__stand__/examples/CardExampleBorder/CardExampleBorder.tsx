import { Example } from '@consta/stand';
import React from 'react';

import { Card } from '##/components/Card';
import { Text } from '##/components/Text/';

export const CardExampleBorder = () => {
  return (
    <Example>
      <Card
        verticalSpace="2xl"
        horizontalSpace="2xl"
        status="success"
        shadow={false}
        border
      >
        <Text view="primary" size="m" lineHeight="m">
          Карточка с границей
        </Text>
      </Card>
      <Card
        verticalSpace="2xl"
        horizontalSpace="2xl"
        status="success"
        shadow={false}
      >
        <Text view="primary" size="m" lineHeight="m">
          Карточка без границы
        </Text>
      </Card>
    </Example>
  );
};
