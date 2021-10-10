import React, { useCallback } from 'react';

import { cnDocsDecorator } from '../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Slider } from '../../Slider';

export const SliderExampleWithRange = () => {
  const getValue = useCallback((val) => {
    return val;
  }, []);

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider min={0} max={100} step={25} value={[0, 50]} getTooltipContent={getValue} division />
    </StoryBookExample>
  );
};
