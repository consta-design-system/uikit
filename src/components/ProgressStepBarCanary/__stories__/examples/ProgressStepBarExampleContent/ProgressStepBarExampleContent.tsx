import './ProgressStepBarExampleContent.css';

import React, { useState } from 'react';

import { IconDinosaur } from '../../../../../icons/IconDinosaur/IconDinosaur';
import { IconSettings } from '../../../../../icons/IconSettings/IconSettings';
import { cn } from '../../../../../utils/bem';
import { Tag } from '../../../../Tag/Tag';
import { ProgressStepBar } from '../../../ProgressStepBarCanary';

const cnProgressStepBarExampleContent = cn('ProgressStepBarExmapleContent');

const StepContent = () => {
  return (
    <div className={cnProgressStepBarExampleContent('Content')}>
      <IconDinosaur size="xs" view="secondary" />
      <Tag mode="button" onClick={() => console.log()} label="Черновик" />
      <Tag mode="button" onClick={() => console.log()} label="" icon={IconSettings} />
    </div>
  );
};

export const ProgressStepBarExampleContent = () => {
  const [status, setStatus] = useState<string>('normal');

  const clickAction = () => {
    setStatus(status === 'normal' ? 'success' : 'normal');
  };

  const steps = [
    {
      label: 'Первый шаг',
      point: 1,
      status,
      lineStatus: 'normal',
      content: <StepContent />,
      onClick: () => clickAction(),
    },
    {
      label: 'Второй шаг',
      point: 2,
      status,
      lineStatus: 'normal',
      onClick: () => clickAction(),
    },
    {
      label: 'Третий шаг',
      point: 3,
      status,
      lineStatus: 'normal',
      onClick: () => clickAction(),
    },
    {
      label: 'Четвёртый шаг',
      point: 4,
      status,
      content: <StepContent />,
      onClick: () => clickAction(),
    },
  ];

  return <ProgressStepBar steps={steps} activeStepIndex={2} size="m" />;
};
