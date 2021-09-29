import React from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cnMixCard } from '../../../MixCard';

export const MixCardExampleSpace = () => {
  return (
    <>
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
    </>
  );
};
