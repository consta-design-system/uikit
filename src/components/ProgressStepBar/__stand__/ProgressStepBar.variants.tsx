import { useSelect } from '@consta/stand';
import React from 'react';

import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { IconClose } from '../../../icons/IconClose/IconClose';
import {
  propDirection,
  propDirectionDefault,
  propSize,
  propSizeDefault,
} from '../helpers';
import { ProgressStepBar } from '../ProgressStepBar';

const stepsExample = [
  {
    label: 'Первый пункт',
    point: IconCheck,
    status: 'success',
    lineStatus: 'success',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Второй пункт',
    point: IconClose,
    status: 'alert',
    lineStatus: 'alert',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Третий пункт',
    point: 3,
    progress: true,
    status: 'warning',
    lineStatus: 'warning',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Четвертый пункт',
    point: 4,
    status: 'normal',
    lineStatus: 'normal',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
];

const Variants = () => {
  const size = useSelect('size', propSize, propSizeDefault);
  const direction = useSelect('direction', propDirection, propDirectionDefault);
  const activeStepIndex = useSelect('activeStepIndex', [0, 1, 2, 3], 3);

  return (
    <ProgressStepBar
      direction={direction}
      size={size}
      steps={stepsExample}
      activeStepIndex={activeStepIndex}
    />
  );
};

export default Variants;
