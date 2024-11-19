import './SnackBarProgress.css';

import React from 'react';

import { ProgressSpin } from '##/components/ProgressSpin';
import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';
import { isNumber } from '##/utils/type-guards';

import { SnackBarProgressProps } from '../types';

const cnSnackBarProgress = cn('SnackBarProgress');

export const SnackBarProgress: React.FC<SnackBarProgressProps> = (props) => {
  const { view = 'spinText', progress, className } = props;
  const progressIsNumber = isNumber(progress);

  return (
    <div
      className={cnSnackBarProgress(null, [
        cnMixFlex({
          flex: 'flex',
          gap: 'xs',
        }),
        className,
      ])}
    >
      {view !== 'text' && (progressIsNumber || progress === true) && (
        <ProgressSpin
          className={cnSnackBarProgress('Spinner')}
          progress={progressIsNumber ? progress : undefined}
          size="m"
          animation
        />
      )}
      {view !== 'spin' && progressIsNumber && (
        <Text size="xs" lineHeight="l" view="secondary">
          {progress}%
        </Text>
      )}
    </div>
  );
};
