import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Button } from '../../../../Button/Button';
import { simpleItems as items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../Steps';

const getContent = (index: number) => `Контент на шаге №${index + 1}`;
const getLabel = (item: string) => item;

export const ExampleStepsContent = () => {
  const [activeStep, setActiveStep] = useState<string>(items[0]);

  const activeStepIndex = items.findIndex((item) => item === activeStep);

  const handleNext = () => setActiveStep(items[activeStepIndex + 1]);
  const handlePrev = () => setActiveStep(items[activeStepIndex - 1]);
  const onChange = ({ value }: { value: string }) => setActiveStep(value);

  return (
    <Example col={1}>
      <Steps
        items={items}
        getItemLabel={getLabel}
        value={activeStep}
        onChange={onChange}
      />
      <div>{getContent(activeStepIndex)}</div>
      <Button
        label="Предыдущий"
        onClick={handlePrev}
        disabled={activeStepIndex === 0}
      />
      <Button
        label="Следующий"
        onClick={handleNext}
        disabled={activeStepIndex === items.length - 1}
      />
    </Example>
  );
};
