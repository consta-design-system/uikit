import './Steps.variants.css';

import { IconBackward } from '@consta/icons/IconBackward';
import { IconForward } from '@consta/icons/IconForward';
import { useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { SimpleItem, simpleItems } from '../__mocks__/mock.data';
import { Steps, stepsDefaultSize, stepsSizes } from '../Steps';

const cnStepsVariants = cn('StepsVariants');

const Variants = () => {
  const size = useSelect('size', stepsSizes, stepsDefaultSize);

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

  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [skippedSteps, setSkippedSteps] = React.useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

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
    <div className={cnStepsVariants()}>
      <Steps
        items={simpleItems}
        getItemLabel={(item) => item}
        value={simpleItems[activeStep]}
        onChange={handleChange}
        getItemCompleted={(item) => completedSteps.includes(getStepIndex(item))}
        getItemSkipped={(item) => skippedSteps.includes(getStepIndex(item))}
        size={size}
      />
      <div className={cnStepsVariants('Content')}>
        {getStepContent(activeStep)}
      </div>
      <div className={cnStepsVariants('Actions')}>
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
};

export default Variants;
