import React, { useCallback } from 'react';

import { cnDocsDecorator } from '../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Slider } from '../../Slider';

export const SliderExampleWithDivision = () => {
  const getValue = useCallback((val) => {
    return val;
  }, []);

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider min={0} max={100} step={25} getTooltipContent={getValue} division />
    </StoryBookExample>
  );
};

export const SliderExampleWithoutDivision = () => {
  const getValue = useCallback((val) => {
    return val;
  }, []);

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider min={0} max={100} step={25} getTooltipContent={getValue} />
    </StoryBookExample>
  );
};
