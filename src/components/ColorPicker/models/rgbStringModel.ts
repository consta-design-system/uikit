import { ColorModel } from '../types';
import { equalColorString } from '../utils/compare';
import { hsvaToRgbString, rgbStringToHsva } from '../utils/convert';

export const rgbStringModel: ColorModel<string> = {
  defaultColor: 'rgb(0, 0, 0)',
  toHsva: rgbStringToHsva,
  fromHsva: hsvaToRgbString,
  equal: equalColorString,
};
