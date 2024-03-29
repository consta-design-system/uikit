import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cnMixCard } from '../../../MixCard';

export const MixCardExampleForm = () => {
  return (
    <Example col={{ 1: 0, 2: 700 }}>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: 'xl',
          form: 'square',
          shadow: true,
        })}
      >
        <Text view="primary" size="m" lineHeight="m">
          square
        </Text>
      </div>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: 'xl',
          form: 'round',
          shadow: true,
        })}
      >
        <Text view="primary" size="m" lineHeight="m">
          round
        </Text>
      </div>
    </Example>
  );
};
