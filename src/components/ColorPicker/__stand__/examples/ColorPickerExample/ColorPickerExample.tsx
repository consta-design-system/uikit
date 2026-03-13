import { Example } from '@consta/stand';
import React from 'react';

import { ColorPicker, rgbaStringModel } from '../../..';

export const ColorPickerExample = () => {
  const [color, setColor] = React.useState(rgbaStringModel.defaultColor);
  return (
    <Example col={1}>
      <div>{color}</div>
      <ColorPicker
        header="Выбор цвета"
        value={color}
        model={rgbaStringModel}
        alpha
        onChange={setColor}
        paletteTitle="Ранее использованные цвета"
        palette={[
          'rgba(146,64,108,0.5)',
          'rgba(80,60,60)',
          'rgba(255,255,255,0.1)',
          'rgba(0,0,0)',
        ]}
      />
    </Example>
  );
};
