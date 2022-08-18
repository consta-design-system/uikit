import './MixCardExampleBorder.css';

import React from 'react';

import { Text } from '##/components/Text/Text';
import { cn } from '##/utils/bem';

import { cnMixCard } from '../../../MixCard';

const cnMixCardExampleForm = cn('MixCardExampleBorder');

export const MixCardExampleBorder = () => {
  return (
    <div className={cnMixCardExampleForm()}>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: '3xl',
          status: 'success',
          form: 'round',
          shadow: false,
          border: true,
        })}
      >
        <Text>Карточка с границей</Text>
      </div>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: '3xl',
          status: 'success',
          form: 'round',
          shadow: false,
          border: false,
        })}
      >
        <Text>Карточка без границы</Text>
      </div>
    </div>
  );
};
