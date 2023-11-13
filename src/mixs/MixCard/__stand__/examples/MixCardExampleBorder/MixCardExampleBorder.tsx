import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '##/components/Text/Text';

import { cnMixCard } from '../../../MixCard';

export const MixCardExampleBorder = () => {
  return (
    <Example col={{ 1: 0, 2: 700 }}>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: '3xl',
          form: 'round',
          shadow: false,
          border: true,
        })}
      >
        <Text view="primary" size="m" lineHeight="m">
          Карточка с границей
        </Text>
      </div>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: '3xl',
          form: 'round',
          shadow: false,
          border: false,
        })}
      >
        <Text view="primary" size="m" lineHeight="m">
          Карточка без границы
        </Text>
      </div>
    </Example>
  );
};
