import { ColorModel } from '../types';
import { equalColorString } from '../utils/compare';
import { hslStringToHsva, hsvaToHslString } from '../utils/convert';

export const hslStringModel: ColorModel<string> = {
  defaultColor: 'hsl(0, 0%, 0%)',
  toHsva: hslStringToHsva,
  fromHsva: hsvaToHslString,
  equal: equalColorString,
};
