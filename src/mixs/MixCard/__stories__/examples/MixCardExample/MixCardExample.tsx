import React from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cnMixCard } from '../../../MixCard';

export const MixCardExample = () => {
  return (
    <div
      className={cnMixCard({
        verticalSpace: 'xl',
        horizontalSpace: '3xl',
        status: 'success',
        form: 'round',
        shadow: true,
      })}
    >
      <Text>Здесь мог быть ваш текст</Text>
    </div>
  );
};
