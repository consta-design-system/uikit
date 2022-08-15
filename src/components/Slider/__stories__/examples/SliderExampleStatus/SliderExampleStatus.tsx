import './SliderExampleStatus.css';

import React, { useState } from 'react';

import { cn } from '../../../../../utils/bem';
import { Slider } from '../../../Slider';

const cnSliderExampleStatus = cn('SliderExampleStatus');

export const SliderExampleStatus = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <div className={cnSliderExampleStatus()}>
      <Slider
        range={false}
        label={`Значение ${value}`}
        caption="Статус alert"
        onChange={({ value }) => setValue(value)}
        value={value}
        status="alert"
      />
      <Slider
        range={false}
        label={`Значение ${value}`}
        caption="Статус warning"
        onChange={({ value }) => setValue(value)}
        value={value}
        status="warning"
      />
      <Slider
        range={false}
        label={`Значение ${value}`}
        caption="Статус success"
        onChange={({ value }) => setValue(value)}
        value={value}
        status="success"
      />
      <Slider
        range={false}
        label={`Значение ${value}`}
        caption="Обычный ползунок"
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </div>
  );
};
