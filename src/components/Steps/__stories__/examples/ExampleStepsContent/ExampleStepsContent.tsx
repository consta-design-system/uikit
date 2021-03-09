import React, { useState } from 'react';

import { simpleItems as items } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
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
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Steps items={items} getLabel={getLabel} value={activeStep} onChange={onChange} />
      <div>{getContent(activeStepIndex)}</div>
      <Button label="Предыдущий" onClick={handlePrev} disabled={activeStepIndex === 0} />
      <Button
        label="Следующий"
        onClick={handleNext}
        disabled={activeStepIndex === items.length - 1}
      />
    </StoryBookExample>
  );
};
