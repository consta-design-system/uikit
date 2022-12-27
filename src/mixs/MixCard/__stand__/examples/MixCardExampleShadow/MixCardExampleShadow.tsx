import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cnMixCard } from '../../../MixCard';

export const MixCardExampleShadow = () => {
  return (
    <Example col={{ 1: 0, 2: 700 }}>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: '3xl',
          status: 'success',
          form: 'round',
          shadow: true,
        })}
      >
        <Text>Карточка с тенью</Text>
      </div>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: '3xl',
          status: 'success',
          form: 'round',
          shadow: false,
        })}
      >
        <Text>Карточка без тени</Text>
      </div>
    </Example>
  );
};
