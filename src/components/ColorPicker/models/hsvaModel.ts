import { ColorModel, HsvaColor } from '../types';
import { equalColorObjects } from '../utils/compare';
import { roundHsva } from '../utils/convert';

export const hsvaModel: ColorModel<HsvaColor> = {
  defaultColor: { h: 0, s: 0, v: 0, a: 1 },
  toHsva: (hsva) => hsva,
  fromHsva: roundHsva,
  equal: equalColorObjects,
};
