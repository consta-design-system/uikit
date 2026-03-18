import { Example } from '@consta/stand';
import React from 'react';

import { ColorPickerBase, rgbaStringModel } from '../../..';

export const ColorPickerBaseExample = () => {
  const [color, setColor] = React.useState(rgbaStringModel.defaultColor);
  return (
    <Example col={1}>
      <div>{color}</div>
      <ColorPickerBase
        value={color}
        model={rgbaStringModel}
        alpha
        onChange={setColor}
      />
    </Example>
  );
};
