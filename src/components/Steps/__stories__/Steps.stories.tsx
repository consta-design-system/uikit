import './Steps.stories.css';

import React from 'react';
import { select } from '@storybook/addon-knobs';

import { SimpleItem, simpleItems } from '../__mocks__/mock.data';
import { IconBackward } from '../../../icons/IconBackward/IconBackward';
import { IconForward } from '../../../icons/IconForward/IconForward';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Steps, stepsDefaultSize, stepsSizes } from '../Steps';

import mdx from './Steps.docs.mdx';

const cnStepsStories = cn('StepsStories');

const defaultKnobs = () => ({
  size: select('size', stepsSizes, stepsDefaultSize),
});

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

  const getStepIndex = (step: SimpleItem | null): number =>
    simpleItems.findIndex((item) => step && item === step);
  const handleNext = () => {
    setCompletedSteps([...completedSteps, activeStep]);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePrev = () => {
    setSkippedSteps([...skippedSteps, activeStep]);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleChange = ({ value }: { value: SimpleItem | null }) => {
    setSkippedSteps([...skippedSteps, activeStep]);
    setActiveStep(getStepIndex(value));
  };

  return (
    <div className={cnStepsStories()}>
      <Steps
        items={simpleItems}
        getLabel={(item) => item}
        value={simpleItems[activeStep]}
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
          disabled={activeStep === simpleItems.length - 1}
        />
      </div>
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Навигация/Steps',
  id: 'components/Steps',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=6747%3A130211',
    },
  },
});
