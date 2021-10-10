import React, { useCallback } from 'react';

import { cnDocsDecorator } from '../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Slider } from '../../Slider';

export const SliderExampleWithSteps = () => {
  const getValue = useCallback((val) => {
    return val;
  }, []);

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider min={0} max={100} step={10} getTooltipContent={getValue} division />
    </StoryBookExample>
  );
};

export const SliderExampleWithCustomSteps = () => {
  const getValue = useCallback((val) => {
    return val;
  }, []);

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider min={0} max={100} step={[8, 23, 30, 36]} getTooltipContent={getValue} division />
    </StoryBookExample>
  );
};

export const SliderExampleWithoutSteps = () => {
  const getValue = useCallback((val) => {
    return val;
  }, []);

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider min={0} max={100} getTooltipContent={getValue} division />
    </StoryBookExample>
  );
};
