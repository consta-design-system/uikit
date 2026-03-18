import { Example } from '@consta/stand';
import React, { useMemo, useState } from 'react';

import { ColorPalette, hslaModel } from '../../..';
import { generateHslaPalette } from '../../generateHslaPalette';

export const ColorPaletteExample = () => {
  const palette = useMemo(() => generateHslaPalette(60), []);

  const [color, setColor] = useState(palette[0]);

  return (
    <Example col={1}>
      <ColorPalette
        model={hslaModel}
        value={color}
        items={palette}
        onChange={setColor}
      />
    </Example>
  );
};
