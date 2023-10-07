import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Slider } from '../../../Slider';

export const SliderExampleViewDefault = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <Example col={1}>
      <Slider
        view="default"
        label={`Значение ${value}`}
        onChange={setValue}
        value={value}
        range={false}
      />
    </Example>
  );
};

export const SliderExampleViewDivision = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <Example col={1}>
      <Slider
        view="division"
        step={10}
        range={false}
        label={`Значение ${value}`}
        onChange={setValue}
        value={value}
      />
    </Example>
  );
};
