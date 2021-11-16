import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Slider } from '../../../Slider';

export const SliderExampleTooltipFormatter = () => {
  const [value, setValue] = useState<[number, number]>([20, 50]);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        step={5}
        range
        label={`Значение ${value[0]}-${value[1]}`}
        tooltipFormatter={(value) => `${value}%`}
        onChange={({ value }) => setValue(value)}
        value={value}
        withTooltip
      />
    </div>
  );
};
