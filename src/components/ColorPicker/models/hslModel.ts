import { ColorModel, HslColor } from '../types';
import { equalColorObjects } from '../utils/compare';
import { hslaToHsl, hslaToHsva, hsvaToHsla } from '../utils/convert';

export const hslModel: ColorModel<HslColor> = {
  defaultColor: { h: 0, s: 0, l: 0 },
  toHsva: ({ h, s, l }) => hslaToHsva({ h, s, l, a: 1 }),
  fromHsva: (hsva) => hslaToHsl(hsvaToHsla(hsva)),
  equal: equalColorObjects,
};
