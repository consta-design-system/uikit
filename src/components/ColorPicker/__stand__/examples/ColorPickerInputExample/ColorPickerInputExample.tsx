import { Example } from '@consta/stand';
import React from 'react';

import { ColorPickerInput, rgbStringModel } from '../../..';

export const ColorPickerInputExample = () => {
  const [color, setColor] = React.useState(rgbStringModel.defaultColor);
  return (
    <Example col={1}>
      <div>{color}</div>
      <ColorPickerInput
        model={rgbStringModel}
        value={color}
        onChange={setColor}
      />
    </Example>
  );
};
