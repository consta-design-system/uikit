import './ProgressStepBar.variants.css';

import { IconCheck } from '@consta/icons/IconCheck';
import { IconClose } from '@consta/icons/IconClose';
import { IconDinosaur } from '@consta/icons/IconDinosaur';
import { IconSettings } from '@consta/icons/IconSettings';
import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import {
  propDirection,
  propDirectionDefault,
  propSize,
  propSizeDefault,
} from '../helpers';
import { ProgressStepBar } from '../ProgressStepBar';

const cnProgressStepBarVariants = cn('ProgressStepBarVariants');

const content = (
  <div className={cnProgressStepBarVariants('Item')}>
    <Text size="xs" lineHeight="xs" view="secondary">
      Небольшое описание или состояние этапа
    </Text>
    <div
      className={cnProgressStepBarVariants('Controls', [
        cnMixSpace({ mT: '2xs' }),
      ])}
    >
      <IconDinosaur size="xs" />
      <Badge status="system" label="черновик" size="s" />
      <Button size="xs" view="ghost" onlyIcon iconLeft={IconSettings} />
    </div>
  </div>
);

const stepsExample = [
  {
    label: 'Первый пункт',
    point: IconCheck,
    status: 'success',
    lineStatus: 'success',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
    content,
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
    content,
  },
];

const Variants = () => {
  const size = useSelect('size', propSize, propSizeDefault);
  const direction = useSelect('direction', propDirection, propDirectionDefault);
  const activeStepIndex = useSelect('activeStepIndex', [-1, 0, 1, 2, 3], 3);
  const withContent = useBoolean('withContent');

  return (
    <ProgressStepBar
      className={cnProgressStepBarVariants()}
      direction={direction}
      size={size}
      steps={stepsExample}
      activeStepIndex={activeStepIndex}
      getItemContent={(item) => (withContent ? item.content : undefined)}
    />
  );
};

export default Variants;
