import { IconSettings } from '@consta/icons/IconSettings';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Slider } from '../../..';

export const SliderExampleContent = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <Example col={1}>
      <Slider
        value={value}
        label={`Значение ${value}`}
        withTooltip
        step={5}
        view="division"
        leftSide="input"
        rightSide={IconSettings}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};

export const SliderExampleContentInputLeftAndRight = () => {
  const [value, setValue] = useState<[number, number]>([20, 50]);

  return (
    <Example col={1}>
      <Slider
        step={5}
        range
        view="division"
        label={`Значение ${value[0]}-${value[1]}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        leftSide="input"
        rightSide="input"
      />
    </Example>
  );
};
