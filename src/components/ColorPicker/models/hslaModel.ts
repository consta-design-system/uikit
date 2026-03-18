import { ColorModel, HslaColor } from '../types';
import { equalColorObjects } from '../utils/compare';
import { hslaToHsva, hsvaToHsla } from '../utils/convert';

export const hslaModel: ColorModel<HslaColor> = {
  defaultColor: { h: 0, s: 0, l: 0, a: 1 },
  toHsva: hslaToHsva,
  fromHsva: hsvaToHsla,
  equal: equalColorObjects,
};
