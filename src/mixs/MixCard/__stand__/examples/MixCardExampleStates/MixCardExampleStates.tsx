import './MixCardExampleStates.css';

import React from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cn } from '../../../../../utils/bem';
import { cnMixCard } from '../../../MixCard';

const cnMixCardExampleStates = cn('MixCardExampleStates');

export const MixCardExampleStates = () => {
  return (
    <div className={cnMixCardExampleStates()}>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: 'xl',
          status: 'alert',
          form: 'round',
          shadow: true,
        })}
      >
        <Text>alert</Text>
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
        <Text>warning</Text>
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
        <Text>success</Text>
      </div>
    </div>
  );
};
