import './SliderExampleSize.css';

import React, { useState } from 'react';

import { cn } from '../../../../../utils/bem';
import { Slider } from '../../../SliderCanary';

const cnSliderExampleSize = cn('SliderExampleSize');

export const SliderExampleSize = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <div className={cnSliderExampleSize()}>
      <Slider
        range={false}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        size="xs"
      />
      <Slider
        range={false}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        size="s"
      />
      <Slider
        range={false}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        size="m"
      />
      <Slider
        range={false}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        size="l"
      />
    </div>
  );
};
