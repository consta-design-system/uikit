import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Slider } from '../../../Slider';

export const SliderExampleStatus = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <Example col={1}>
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
    </Example>
  );
};
