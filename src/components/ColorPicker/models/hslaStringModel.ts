import { ColorModel } from '../types';
import { equalColorString } from '../utils/compare';
import { hslaStringToHsva, hsvaToHslaString } from '../utils/convert';

export const hslaStringModel: ColorModel<string> = {
  defaultColor: 'hsla(0, 0%, 0%, 1)',
  toHsva: hslaStringToHsva,
  fromHsva: hsvaToHslaString,
  equal: equalColorString,
};
