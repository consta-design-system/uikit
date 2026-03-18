import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';

import { ColorPicker, hexModel } from '../../..';

export const ColorPickerExampleAnchor = () => {
  const [color, setColor] = React.useState(hexModel.defaultColor);
  const anchorRef = React.useRef(null);
  return (
    <Example col={1}>
      <>
        <Button label={color} ref={anchorRef} />
        <ColorPicker
          value={color}
          model={hexModel}
          onChange={setColor}
          anchorRef={anchorRef}
        />
      </>
    </Example>
  );
};
