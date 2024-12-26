import './Steps.variants.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconArrowNext } from '@consta/icons/IconArrowNext';
import { IconArrowPrevious } from '@consta/icons/IconArrowPrevious';
import { IconCheck } from '@consta/icons/IconCheck';
import { IconClose } from '@consta/icons/IconClose';
import { useBoolean, useSelect } from '@consta/stand';
import React, { useCallback, useState } from 'react';

import { FieldLabel } from '##/components/FieldComponents';
import { RadioGroup } from '##/components/RadioGroup';
import { cnMixSpace } from '##/mixs/MixSpace';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { stepsDefaultSize, stepsSizes } from '../__mocks__/props.mocks';
import { Steps } from '../StepsCanary';

const cnStepsVariants = cn('StepsVariants');

type StepContent = {
  label: string;
  description: string;
  content: React.ReactNode;
};

type Status = 'unknown' | 'error' | 'resolved';

const stepsContent: Record<string, StepContent> = {
  1: {
    label: 'Первый шаг',
    description: 'Описание первого шага',
    content: 'Контент первого шага',
  },
  2: {
    label: 'Второй шаг',
    description: 'Описание второго шага',
    content: 'Контент второго шага',
  },
  3: {
    label: 'Третий шаг',
    description: 'Описание третьего шага',
    content: 'Контент третьего шага',
  },
  4: {
    label: 'Четвертый шаг',
    description: 'Описание четвертого шага',
    content: 'Контент четвертого шага',
  },
  5: {
    label: 'Пятый шаг',
    description: 'Описание пятого шага',
    content: 'Контент пятого шага',
  },
};

const radioGroupLabelMap: Record<Status, string> = {
  error: 'С ошибкой',
  resolved: 'Без ошибок',
  unknown: 'Пропущен',
};

const stepIconMap: Record<Status, IconComponent | undefined> = {
  error: IconClose,
  resolved: IconCheck,
  unknown: undefined,
};

const steps: string[] = Object.keys(stepsContent);

const radioGroupItems: Status[] = ['unknown', 'error', 'resolved'];
const radioGroupGetLabel = (item: Status) => radioGroupLabelMap[item];

const Variants = () => {
  const size = useSelect('size', stepsSizes, stepsDefaultSize);
  const withNumber = useBoolean('withNumber', true);
  const withDescription = useBoolean('withDescription');
  const labelWordWrap = useBoolean('labelWordWrap');
  const fitMode = useSelect(
    'fitMode',
    ['scroll', 'scrollWithButtons'],
    'scroll',
  );

  const [value, setValue] = useState<string>(steps[0]);
  const [statuses, setStatuses] = useState<Record<string, Status>>({});

  const handleNext = useCallback(() => {
    setValue((state) => {
      const nextStep = Number(state) + 1;
      if (nextStep <= steps.length) {
        return nextStep.toString();
      }
      return state;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setValue((state) => {
      const nextStep = Number(state) - 1;
      if (nextStep > 0) {
        return nextStep.toString();
      }
      return state;
    });
  }, []);

  const radioGroupOnChange = (item: Status) => {
    setStatuses({ ...statuses, [value]: item });
  };

  return (
    <div className={cnStepsVariants()}>
      <Steps
        items={steps}
        getItemLabel={(item) => stepsContent[item]?.label}
        value={value}
        onChange={setValue}
        getItemIcon={(item) => stepIconMap[statuses[item]]}
        getItemDescription={
          withDescription ? (item) => stepsContent[item].description : undefined
        }
        getItemStatus={(item) => {
          const status = statuses[item];
          return status === 'unknown' ? undefined : status;
        }}
        withNumber={withNumber}
        fitMode={fitMode}
        size={size}
        labelWordWrap={labelWordWrap}
      />
      <div className={cnStepsVariants('Content', [cnMixSpace({ pV: 'xl' })])}>
        <Text className={cnMixSpace({ mB: 'l' })}>
          {stepsContent[value].content}
        </Text>
        <FieldLabel className={cnMixSpace({ mB: 's' })}>
          Выполнение шага:
        </FieldLabel>
        <RadioGroup
          items={radioGroupItems}
          getItemLabel={radioGroupGetLabel}
          value={statuses[value] || 'unknown'}
          onChange={radioGroupOnChange}
        />
      </div>
      <div className={cnStepsVariants('Actions')}>
        <Button
          onClick={handlePrev}
          label="Отклонить"
          iconLeft={IconArrowNext}
        />
        <Button
          onClick={handleNext}
          label="Принять"
          iconRight={IconArrowPrevious}
        />
      </div>
    </div>
  );
};

export default Variants;
