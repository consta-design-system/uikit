import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Slider } from '../../../SliderCanary';

export const SliderExampleLabel = () => {
  const [value, setValue] = useState<[number, number]>([20, 50]);

  return (
    <div className={cnDocsDecorator('Section')}>
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
    </div>
  );
};
