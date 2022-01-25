import React, { useState } from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Slider } from '../../../SliderCanary';

export const SliderExampleBasic = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <StoryBookExample>
      <Slider
        range={false}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </StoryBookExample>
  );
};
