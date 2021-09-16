import './MixCardExampleShadow.css';

import React from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cn } from '../../../../../utils/bem';
import { cnMixCard } from '../../../MixCard';

const cnMixCardExampleForm = cn('MixCardExampleShadow');

export const MixCardExampleShadow = () => {
  return (
    <div className={cnMixCardExampleForm()}>
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
    </div>
  );
};
