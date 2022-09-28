import './MixCardExampleForm.css';

import React from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cn } from '../../../../../utils/bem';
import { cnMixCard } from '../../../MixCard';

const cnMixCardExampleForm = cn('MixCardExampleForm');

export const MixCardExampleForm = () => {
  return (
    <div className={cnMixCardExampleForm()}>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: 'xl',
          form: 'square',
          shadow: true,
        })}
      >
        <Text>square</Text>
      </div>
      <div
        className={cnMixCard({
          verticalSpace: 'xl',
          horizontalSpace: 'xl',
          form: 'round',
          shadow: true,
        })}
      >
        <Text>round</Text>
      </div>
    </div>
  );
};
