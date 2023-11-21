import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Slider } from '../../../Slider';

export const SliderExampleSize = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <Example col={1}>
      <Slider
        range={false}
        label={`Значение ${value}`}
        onChange={setValue}
        value={value}
        size="xs"
      />
      <Slider
        range={false}
        label={`Значение ${value}`}
        onChange={setValue}
        value={value}
        size="s"
      />
      <Slider
        range={false}
        label={`Значение ${value}`}
        onChange={setValue}
        value={value}
        size="m"
      />
      <Slider
        range={false}
        label={`Значение ${value}`}
        onChange={setValue}
        value={value}
        size="l"
      />
    </Example>
  );
};
