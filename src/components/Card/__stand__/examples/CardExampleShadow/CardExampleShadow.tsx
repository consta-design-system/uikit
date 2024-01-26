import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../Text/Text';
import { Card } from '../../../Card';

export const CardExampleShadow = () => {
  return (
    <Example>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="success">
        <Text view="primary" size="m" lineHeight="m">
          Карточка с тенью
        </Text>
      </Card>
      <Card
        verticalSpace="2xl"
        horizontalSpace="2xl"
        status="success"
        shadow={false}
      >
        <Text view="primary" size="m" lineHeight="m">
          Карточка без тени
        </Text>
      </Card>
    </Example>
  );
};
