import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Slider } from '../../../Slider';

export const SliderExampleStepSingle = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <Example col={1}>
      <Slider
        view="division"
        step={10}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        range={false}
      />
    </Example>
  );
};

export const SliderExampleStepArray = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <Example col={1}>
      <Slider
        view="division"
        step={[15, 40, 70]}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        range={false}
      />
    </Example>
  );
};
