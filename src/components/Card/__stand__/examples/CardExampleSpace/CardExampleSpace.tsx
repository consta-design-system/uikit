import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../Text/Text';
import { Card, cardPropSpace } from '../../../Card';

export const CardExampleSpace = () => {
  return (
    <Example col={1}>
      {cardPropSpace.map((item) => (
        <Card verticalSpace={item} horizontalSpace={item}>
          <Text>{`Отступы '${item}'`}</Text>
        </Card>
      ))}
    </Example>
  );
};
