import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Slider } from '../../../Slider';

export const SliderExampleMinMax = () => {
  const [value, setValue] = useState<number>(50);

  return (
    <Example col={1}>
      <Slider
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        range={false}
        min={20}
        max={70}
      />
    </Example>
  );
};
