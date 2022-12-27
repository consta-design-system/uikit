import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cnMixCard } from '../../../MixCard';

export const MixCardExampleSpace = () => {
  return (
    <Example col={{ 1: 0, 2: 700 }}>
      <div
        className={cnMixCard({
          verticalSpace: 'xs',
          horizontalSpace: 'xs',
          form: 'round',
          shadow: true,
        })}
      >
        <Text>Отступы xs</Text>
      </div>
      <div
        className={cnMixCard({
          verticalSpace: '5xl',
          horizontalSpace: '5xl',
          form: 'round',
          shadow: true,
        })}
      >
        <Text>Отступы 5xl</Text>
      </div>
    </Example>
  );
};
