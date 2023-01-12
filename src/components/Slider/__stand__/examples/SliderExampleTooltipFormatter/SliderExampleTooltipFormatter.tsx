import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Slider } from '../../../Slider';

export const SliderExampleTooltipFormatter = () => {
  const [value, setValue] = useState<[number, number]>([20, 50]);

  return (
    <Example col={1}>
      <Slider
        step={5}
        range
        label={`Значение ${value[0]}-${value[1]}`}
        tooltipFormatter={(value) => `${value}%`}
        onChange={({ value }) => setValue(value)}
        value={value}
        withTooltip
      />
    </Example>
  );
};
