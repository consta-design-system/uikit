import { IconSettings } from '@consta/icons/IconSettings';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Slider } from '../../../Slider';

export const SliderExampleContent = () => {
  const [value, setValue] = useState<[number, number]>([20, 50]);

  return (
    <Example col={1}>
      <Slider
        value={value}
        range
        label={`Значение ${value[0]}-${value[1]}`}
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
