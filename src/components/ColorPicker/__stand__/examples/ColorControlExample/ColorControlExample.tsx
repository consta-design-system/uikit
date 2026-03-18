import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { ColorControl, ColorPicker, hexAlphaModel } from '../../..';

export const ColorControlExample = () => {
  const [color, setColor] = useState(hexAlphaModel.defaultColor);
  const rootRef = useRef(null);
  const markerRef = useRef(null);
  return (
    <Example col={1}>
      <>
        <ColorControl
          model={hexAlphaModel}
          value={color}
          onChange={setColor}
          ref={rootRef}
          markerRef={markerRef}
          alpha
        />
        <ColorPicker
          value={color}
          model={hexAlphaModel}
          onChange={setColor}
          anchorRef={rootRef}
          controlRef={markerRef}
          alpha
        />
      </>
    </Example>
  );
};
