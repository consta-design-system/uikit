import { IconQuestion } from '@consta/icons/IconQuestion';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Slider } from '../../../Slider';

export const SliderExampleLabel = () => {
  const [value, setValue] = useState<[number, number]>([20, 50]);

  return (
    <Example col={1}>
      <Slider
        step={5}
        range
        label="Пример"
        caption="Выберите значения"
        status="success"
        withTooltip
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </Example>
  );
};

export const SliderExampleLabelIcon = () => {
  const [value, setValue] = useState<[number, number]>([20, 50]);

  return (
    <Example col={1}>
      <Slider
        step={5}
        range
        label="Пример"
        labelIcon={IconQuestion}
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </Example>
  );
};
