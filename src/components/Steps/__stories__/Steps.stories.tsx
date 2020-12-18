import './Steps.stories.css';

import React from 'react';
import { select } from '@storybook/addon-knobs';

import { IconBackward } from '../../../icons/IconBackward/IconBackward';
import { IconForward } from '../../../icons/IconForward/IconForward';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Steps, stepsDefaultSize, stepsSizes } from '../Steps';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Steps.mdx';

const cnStepsStories = cn('StepsStories');

const defaultKnobs = () => ({
  size: select('size', stepsSizes, stepsDefaultSize),
});

type Item = {
  label: string;
};

const items: Item[] = [
  {
    label: 'Главное',
  },
  {
    label: 'Важное',
  },
  {
    label: 'Необязательное',
  },
];

const getStepContent = (stepNumber: number) => {
  switch (stepNumber) {
    case 0:
      return <Text view="primary">Содержимое первого шага</Text>;
    case 1:
      return <Text view="primary">Содержимое второго шага</Text>;
    case 2:
      return <Text view="brand">Содержимое шага № 3</Text>;
    default:
      return `unknown ${stepNumber} step`;
  }
};

export function Playground() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [skippedSteps, setSkippedSteps] = React.useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

  const { size } = defaultKnobs();

  const getStepIndex = (step: Item | null): number =>
    items.findIndex((item) => step && item.label === step.label);
  const handleNext = () => {
    setCompletedSteps([...completedSteps, activeStep]);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePrev = () => {
    setSkippedSteps([...skippedSteps, activeStep]);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleChange = ({ value }: { value: Item | null }) => {
    setSkippedSteps([...skippedSteps, activeStep]);
    setActiveStep(getStepIndex(value));
  };

  return (
    <div className={cnStepsStories()}>
      <Steps
        items={items}
        getLabel={(item) => item.label}
        value={items[activeStep]}
        onChange={handleChange}
        getCompleted={(item) => completedSteps.includes(getStepIndex(item))}
        getSkipped={(item) => skippedSteps.includes(getStepIndex(item))}
        size={size}
      />
      <div className={cnStepsStories('Content')}>{getStepContent(activeStep)}</div>
      <div className={cnStepsStories('Actions')}>
        <Button
          onClick={handlePrev}
          label="Назад"
          iconLeft={IconBackward}
          view="ghost"
          disabled={activeStep === 0}
        />
        <Button
          onClick={handleNext}
          label="Дальше"
          iconRight={IconForward}
          disabled={activeStep === items.length - 1}
        />
      </div>
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Steps',
  id: 'components/Steps',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
