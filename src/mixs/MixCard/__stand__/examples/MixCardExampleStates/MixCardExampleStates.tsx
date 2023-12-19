import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cnMixCard } from '../../../MixCard';

export const MixCardExampleStates = () => {
  return (
    <Example col={{ 1: 0, 2: 400, 3: 600 }}>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: 'xl',
          status: 'alert',
          form: 'round',
          shadow: true,
        })}
      >
        <Text view="primary" size="m" lineHeight="m">
          alert
        </Text>
      </div>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: 'xl',
          status: 'warning',
          form: 'round',
          shadow: true,
        })}
      >
        <Text view="primary" size="m" lineHeight="m">
          warning
        </Text>
      </div>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: 'xl',
          status: 'success',
          form: 'round',
          shadow: true,
        })}
      >
        <Text view="primary" size="m" lineHeight="m">
          success
        </Text>
      </div>
    </Example>
  );
};
