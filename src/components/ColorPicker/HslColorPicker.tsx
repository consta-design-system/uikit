import React from 'react';

import { ColorPicker } from './ColorPicker';
import { ColorModel, ColorPickerBaseProps, HslColor } from './types';
import { equalColorObjects } from './utils/compare';
import { hslaToHsl, hslaToHsva, hsvaToHsla } from './utils/convert';

const colorModel: ColorModel<HslColor> = {
  defaultColor: { h: 0, s: 0, l: 0 },
  toHsva: ({ h, s, l }) => hslaToHsva({ h, s, l, a: 1 }),
  fromHsva: (hsva) => hslaToHsl(hsvaToHsla(hsva)),
  equal: equalColorObjects,
};

export const HslColorPicker = (
  props: Partial<ColorPickerBaseProps<HslColor>>,
): JSX.Element => <ColorPicker {...props} colorModel={colorModel} />;
